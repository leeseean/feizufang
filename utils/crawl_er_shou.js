const superagent = require("superagent");
const { referer, delay } = require("./crawlHelper");
const qs = require("qs");
const prisma = require("../prisma/prisma");
const cron = require("node-cron");
const { DateTime } = require("luxon");
const superagentPromise = (url) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .timeout(60000)
      // .proxy(proxyUrl)
      .set(
        "Cookie",
        `z67S_2132_saltkey=n2c8W72y; z67S_2132_lastvisit=1691034266; z67S_2132_isms_login_referer=https%3A%2F%2Fwww.flw.ph%2Fplugin.php%3Fid%3Dfn_house%26m%3Dpublish%26class%3D2; z67S_2132_connect_is_bind=0; z67S_2132_nofavfid=1; _ga_JGD4T5H0X5=GS1.1.1691989428.18.1.1691989428.0.0.0; z67S_2132_visitedfid=40D47; z67S_2132_st_p=299807%7C1691991028%7Ce82b90accd893dcd0eca05ff5b35d716; z67S_2132_viewid=tid_1256716; z67S_2132_ulastactivity=dd4bE8iX1kub3cvyoqMQkT6qS1rYsy2FPkyMYeFM6vttC758anHP; z67S_2132_auth=5899%2FfNDniauz7piQYVKQpaD%2B39DTRAnFET279G7F%2FwHRmWH2IK5fMgdRHUoPtO1WgFuDtkOHNaialtj3dqjQtanmHw; z67S_2132_smile=1D1; CURAD=5; _ga_0VVX8RGWS8=GS1.1.1692075245.3.1.1692075436.0.0.0; SECKEY_ABVK=5YQ/opGUu0Ksudl+FhgAsYKE0lv9PtzvVB8wygjItWg%3D; BMAP_SECKEY=5YQ_opGUu0Ksudl-FhgAsYSbKZPl8zqV1idJ08hJqtCc_H9b4sUH5vCn1mqGUEF2Sq6LS1VsvlErKoY9y6L_P47mHF3YdhNRPqCjv1cBvnrypIPJ1wX6vczQW5LxyS6YGg_xGMqIuC8OpZJpOKbP9eSoPKtO5_VJ6-bUDRsYUPJfimcGgChglh-iHA7DmOQ5; z67S_2132_sid=zyjH63; z67S_2132_lip=103.104.101.122%2C1692184566; z67S_2132_lastact=1692184568%09plugin.php%09; _ga=GA1.1.635480366.1691037869; _ga_WF44D8C5GF=GS1.1.1692184567.21.1.1692184865.0.0.0`,
      )
      .set("Accept", "text/html")
      .set("Referer", referer)
      .set(
        "User-Agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      )
      .end((err, res) => {
        resolve([err, res]);
      });
  });
};

const COUNT = 200;

async function query(pageIndex) {
  try {
    const querys = qs.stringify({
      id: "zimu_fenlei",
      model: "list",
      page: pageIndex,
      ids: "2",
      cid1: "0",
    });
    // https://www.flw.ph/plugin.php?id=zimu_fenlei&model=list&ids=2&cid1=0&page=1
    superagentPromise(`https://www.flw.ph/plugin.php?${querys}`).then(
      async (res) => {
        if (res[0]) {
          await delay(2000);
          return query(pageIndex);
        }
        // 存到数据库
        const prisma = require("../prisma/prisma");
        const list = JSON.parse(res[1].text).data.plists;
        // console.log(list);
        for (const data of list) {
          const result = await prisma.er_shou
            .findFirst({
              where: {
                id: Number(data.id),
              },
            })
            .catch((e) => console.log(e));
          if (result) continue;
          prisma.er_shou
            .create({
              data: {
                username: data.username,
                id: data.id,
                oss_imgs: data.imglist,
                imgs: data.imglist
                  ? data.imglist.map(
                      (item) => "/upload/erShou/" + item.split("/").pop(),
                    )
                  : [],
                content: data.con,
                price: findItem(data.diycon, "价格") || "面议",
                quality: findItem(data.diycon, "新旧程度") || "9成",
                way: findItem(data.diycon, "交易方式") || "面交",
                created_at: DateTime.fromMillis(data.addtime * 1000).toFormat(
                  "yyyy-MM-dd'T'HH:mm:ss.SSSZZ",
                ),
              },
            })
            .then((o) => {
              if (pageIndex === COUNT - 1) {
                console.log("完成");
              }
            })
            .catch((e) => console.log(e));
        }
      },
    );
  } catch (e) {
    console.log(e);
  }
}

// 每周执行一次
/*cron.schedule("0 0 * * 1", () => {
  for (let i = 0; i < COUNT; i++) {
    query(i);
  }
});*/
// query(1);
/*for (let i = 0; i < COUNT; i++) {
  query(i);
}*/
function findItem(o = [], v = "") {
  if (!o) o = [];
  return o.find((item) => item.name === v)?.value;
}
//下载图片在浏览器运行这段代码
/*function downloadBlobFromURL(url, filename) {
  // 创建一个 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    if (xhr.status === 200) {
      // 将响应数据转换为 Blob
      const blob = xhr.response;

      // 创建一个下载链接
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || url.split('/').slice(-1); // 设置文件名
      link.click();

      // 释放链接对象
      window.URL.revokeObjectURL(link.href);
    }
  };

  xhr.send();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function ddo() {
    for (const item of aaaa) {
        for (const img of item) {
            await sleep(500)
            downloadBlobFromURL(img)
        }
    }
}
ddo()*/

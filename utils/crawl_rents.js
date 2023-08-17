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
        `z67S_2132_saltkey=n2c8W72y; z67S_2132_lastvisit=1691034266; CURAD=1; _ga_0VVX8RGWS8=GS1.1.1691037871.1.1.1691037889.0.0.0; z67S_2132_isms_login_referer=https%3A%2F%2Fwww.flw.ph%2Fplugin.php%3Fid%3Dfn_house%26m%3Dpublish%26class%3D2; z67S_2132_auth=8d80cyem9WHVDmp59BzJSzx%2BFxSmwwYtSdDxdPIgRycLvACxaGY0A2IW5Vokc6Dw6sPqOMXOG7AqgpB0jhlx%2BQ1tOzw; z67S_2132_creditnotice=0D0D2D0D0D0D0D0D0D299807; z67S_2132_creditrule=%E6%AF%8F%E5%A4%A9%E7%99%BB%E5%BD%95; z67S_2132_connect_is_bind=0; SECKEY_ABVK=5YQ/opGUu0Ksudl+FhgAsTf5Li0eOoSXRM+A6kdrFjs%3D; BMAP_SECKEY=5YQ_opGUu0Ksudl-FhgAsWAUuBelYoLGOiV4NebxusiB01bFGbc8b2wF0Gx7s9uJ16M_44j9TH1HWTx28DbzBuxl1a2HsqqfhhecZZciUUxaCMgJATdbcCdN-MNllmuymXK9_OQjMIilTVODgC3iiM3In8Dn3nsDW7-Bz8ejxBm97mBxldQ8M4M8MhB_RWGi; z67S_2132_creditbase=0D0D2D0D0D0D0D0D0; z67S_2132_ulastactivity=26fbtd60ygxlLlprQ7KppcuhDp2%2BWBm3WZghGQlh0IQYDteor%2BJH; z67S_2132_nofavfid=1; z67S_2132_visitedfid=47; z67S_2132_st_p=299807%7C1691481298%7Cefbc1ed1a7f41222cf43508146d903da; z67S_2132_viewid=tid_1255818; _gid=GA1.2.975428790.1691481305; _gat_gtm.js=1; z67S_2132_sid=lQErq3; z67S_2132_lip=103.104.101.122%2C1691492007; z67S_2132_lastact=1691492038%09plugin.php%09; _ga_JGD4T5H0X5=GS1.1.1691492006.12.1.1691492039.0.0.0; _ga=GA1.1.635480366.1691037869; _ga_WF44D8C5GF=GS1.1.1691492006.12.1.1691492039.0.0.0`,
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
const houseTypeConfig = [
  {
    value: "",
    label: "不限",
  },
  {
    value: "1",
    label: "普通住宅（民房）",
  },
  {
    value: "2",
    label: "公寓式住宅",
  },
  {
    value: "3",
    label: "复式住宅",
  },
  {
    value: "4",
    label: "跃层式住宅",
  },
  {
    value: "5",
    label: "小户型住宅",
  },
  {
    value: "6",
    label: "花园洋房式住宅(别墅)",
  },
];
const decorationTypeConfig = [
  {
    value: "",
    label: "不限",
  },
  {
    value: "1",
    label: "毛坯",
  },
  {
    value: "2",
    label: "普通装修",
  },
  {
    value: "3",
    label: "精装修",
  },
  {
    value: "4",
    label: "豪华装修",
  },
];
const orientationConfig = [
  {
    value: "",
    label: "不限",
  },
  {
    value: "3",
    label: "朝南",
  },
  {
    value: "4",
    label: "朝北",
  },
  {
    value: "1",
    label: "朝东",
  },
  {
    value: "2",
    label: "朝西",
  },
  {
    value: "5",
    label: "东南",
  },
  {
    value: "6",
    label: "西南",
  },
  {
    value: "9",
    label: "南北",
  },
  {
    value: "8",
    label: "西北",
  },
  {
    value: "7",
    label: "东北",
  },
];
const houseTypes = [
  {
    value: "",
    label: "不限",
  },
  {
    value: "1",
    label: "一室",
  },
  {
    value: "2",
    label: "二室",
  },
  {
    value: "3",
    label: "三室",
  },
  {
    value: "4",
    label: "四室",
  },
  {
    value: "5",
    label: "五室",
  },
  {
    value: "6",
    label: "五室以上",
  },
];
const COUNT = 2;

async function query(pageIndex) {
  try {
    const querys = qs.stringify({
      id: "fn_house:Ajax",
      f: "GetAjaxList",
      page: pageIndex,
      class: "2",
      formhash: "1b142267",
      publish_type: "",
      keyword: "",
      keywordto: "",
      province: "",
      city: "",
      dist: "",
      price: "",
      vice_class: "",
      room: "",
      order: "",
      house_type: "",
      decoration_type: "",
      orientation: "",
      configure: "",
      tag: "",
      vr_url: "",
    });
    superagentPromise(`https://www.flw.ph/plugin.php?${querys}`).then(
      async (res) => {
        if (res[0]) {
          await delay(2000);
          return query(pageIndex);
        }
        // 存到数据库
        const prisma = require("../prisma/prisma");
        const list = JSON.parse(res[1].text);
        for (const data of list) {
          const result = await prisma.rentlist.findFirst({
            where: {
              id: Number(data.id),
            },
          });
          if (result) continue;
          prisma.rentlist
            .create({
              data: {
                id: Number(data.id),
                wx: data.param.wx,
                zfj: data.param.zfj,
                imgs: data.param.images,
                publish_type: data.publish_type,
                username: data.username,
                tel: data.mobile,
                vice_class: data.vice_class,
                title: data.title,
                province: data.province,
                city: data.city,
                community: data.community,
                priceNegotiable: data.price === "面议" ? "1" : "0",
                price: data.price === "面议" ? null : +data.price,
                square: data.square,
                floor: data.floor,
                count_floor: data.count_floor,
                room: data.room,
                office: data.office,
                guard: data.guard,
                house_type: houseTypeConfig.find(
                  (o) => o.label === data.house_type,
                )
                  ? houseTypeConfig.find((o) => o.label === data.house_type)
                      .value
                  : null,
                decoration_type: decorationTypeConfig.find(
                  (o) => o.label === data.decoration_type,
                )
                  ? decorationTypeConfig.find(
                      (o) => o.label === data.decoration_type,
                    ).value
                  : "",
                orientation: data.orientation,
                configure: data.configure,
                tag: data.tag,
                content: data.content,
                dateline: data.dateline.includes("前")
                  ? DateTime.local().toISO()
                  : DateTime.local(data.dateline).toISO(),
                updateline: data.updateline.includes("前")
                  ? DateTime.local().toISO()
                  : DateTime.local(data.updateline).toISO(),
                topdateline: DateTime.local(data.topdateline).toISO(),
                price_text: data.price_text,
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

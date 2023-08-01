const superagent = require("superagent");
const { referer, delay } = require("./crawlHelper");
const qs = require("qs");
const prisma = require("../prisma/prisma");
const cron = require("node-cron");
const superagentPromise = (url) => {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .timeout(60000)
      // .proxy(proxyUrl)
      .set(
        "Cookie",
        `z67S_2132_saltkey=lSC80ZoB; z67S_2132_lastvisit=1689345858; CURAD=4; _gid=GA1.2.52164169.1690698992; _ga_0VVX8RGWS8=GS1.1.1690698992.4.0.1690698992.0.0.0; _ga_WF44D8C5GF=GS1.1.1690714866.7.1.1690714867.0.0.0; _ga_JGD4T5H0X5=GS1.1.1690714866.4.1.1690714867.0.0.0; _ga=GA1.2.1563921149.1689349526; z67S_2132_sid=vODQKs; z67S_2132_lastact=1690734413%09plugin.php%09`,
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
    value: 0,
    label: "不限",
  },
  {
    value: 1,
    label: "普通住宅（民房）",
  },
  {
    value: 2,
    label: "公寓式住宅",
  },
  {
    value: 3,
    label: "复式住宅",
  },
  {
    value: 4,
    label: "跃层式住宅",
  },
  {
    value: 5,
    label: "小户型住宅",
  },
  {
    value: 6,
    label: "花园洋房式住宅(别墅)",
  },
];
const decorationTypeConfig = [
  {
    value: 0,
    label: "不限",
  },
  {
    value: 1,
    label: "毛坯",
  },
  {
    value: 2,
    label: "普通装修",
  },
  {
    value: 3,
    label: "精装修",
  },
  {
    value: 4,
    label: "豪华装修",
  },
];
const orientationConfig = [
  {
    value: 0,
    label: "不限",
  },
  {
    value: 1,
    label: "朝南",
  },
  {
    value: 2,
    label: "朝北",
  },
  {
    value: 3,
    label: "朝东",
  },
  {
    value: 4,
    label: "朝西",
  },
  {
    value: 5,
    label: "东南",
  },
  {
    value: 6,
    label: "西南",
  },
  {
    value: 7,
    label: "南北",
  },
  {
    value: 8,
    label: "西北",
  },
  {
    value: 9,
    label: "东北",
  },
];
const houseTypes = [
  {
    value: 0,
    label: "不限",
  },
  {
    value: 1,
    label: "一室",
  },
  {
    value: 2,
    label: "二室",
  },
  {
    value: 3,
    label: "三室",
  },
  {
    value: 4,
    label: "四室",
  },
  {
    value: 5,
    label: "五室",
  },
  {
    value: 6,
    label: "五室以上",
  },
];
const setObj = {};
const COUNT = 10;

async function query(pageIndex) {
  try {
    const querys = qs.stringify({
      id: "fn_house:Ajax",
      f: "GetAjaxList",
      page: pageIndex,
      class: "2",
      formhash: "87734e3f",
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
          if (setObj[data.id]) continue;
          setObj[data.id] = true;
          prisma.rents
            .create({
              data: {
                id: data.id,
                agent_id: data.agent_id,
                publish_type: data.publish_type,
                uid: data.uid,
                username: data.username,
                name: data.name,
                mobile: data.mobile,
                class: data.class,
                vice_class: data.vice_class,
                title: data.title,
                small_area: data.small_area,
                province: data.province,
                city: data.city,
                dist: data.dist,
                community: data.community,
                lat: data.lat,
                lng: data.lng,
                price: data.price === "面议" ? null : Number(data.price),
                square: data.square,
                video_url: data.video_url,
                vr_url: data.vr_url,
                floor: data.floor,
                count_floor: data.count_floor,
                room: data.room,
                office: data.office,
                guard: data.guard,
                deposit: data.deposit,
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
                years: data.years,
                orientation: +data.orientation,
                property_right: data.property_right,
                management_type: data.management_type,
                shops_type: data.shops_type,
                configure: data.configure,
                tag: data.tag,
                content: data.content,
                param: data.param,
                display: data.display,
                hot: data.hot,
                payment_state: data.payment_state,
                deal: data.deal,
                click: data.click,
                dateline: data.dateline.includes("前")
                  ? new Date().toLocaleDateString()
                  : data.dateline,
                edit_dateline: data.edit_dateline,
                updateline: data.updateline.includes("前")
                  ? new Date().toLocaleDateString()
                  : data.updateline,
                topdateline: data.topdateline,
                is_free: data.is_free,
                o_tilte: data.o_tilte,
                o_content: data.o_content,
                ftitle: data.ftitle,
                huxing: houseTypes.find((o) => o.label === data.huxing)
                  ? houseTypes.find((o) => o.label === data.huxing).value
                  : "",
                province_text: data.province_text,
                display_text: data.display_text,
                overdue_text: data.overdue_text,
                see_updateline: data.see_updateline,
                publish_type_text: data.publish_type_text,
                return_top: data.return_top,
                vice_class_text: data.vice_class_text,
                price_text: data.price_text,
                refresh: data.refresh,
                top: data.top,
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

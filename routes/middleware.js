// 在路由级别定义中间件，设置共享变量
const prisma = require("../prisma/prisma");
const sharedVariableMiddleware = (req, res, next) => {
  req.sharedVariable = "Shared Value";
  next();
};

// 在路由中使用中间件
/*app.get('/', sharedVariableMiddleware, (req, res) => {
    const sharedValue = req.sharedVariable;
    res.send(`Shared Value: ${sharedValue}`);
});*/

// 定义中间件函数
const checkLogin = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

// 在需要验证用户登录状态的路由中使用中间件
/*app.get('/profile', checkLogin, (req, res) => {
  res.render('profile');
});*/

// 设置省市列表全局变量

module.exports = {
  sharedVariableMiddleware,
  checkLogin,
};
var a = {
  id: "4170",
  agent_id: "0",
  publish_type: "1",
  uid: "243474",
  username: "诚信房产-Mark",
  name: "mark-房产管理",
  mobile: "9158636999",
  class: "2",
  vice_class: "1",
  title: "出租makati 高档大三室公寓出租 看马尼拉湾。",
  small_area: "",
  province: "1",
  city: "1.2",
  dist: "",
  community: "makati Ayala Park Terraces ayala",
  lat: "",
  lng: "",
  price: "面议",
  square: "270",
  video_url: "",
  vr_url: "",
  floor: "0",
  count_floor: "0",
  room: "3",
  office: "1",
  guard: "3",
  deposit: "0",
  house_type: "公寓式住宅",
  decoration_type: "豪华装修",
  years: "0",
  orientation: "3",
  property_right: "0",
  management_type: null,
  shops_type: null,
  configure: "4,3,2,1,5,6,7,8,12,11,10,9",
  tag: "1,2,3,6,5,4,7,8",
  content:
    "<p style=\\\"margin: 0px; font-stretch: normal; font-size: 12px; line-height: normal; font-family: \\'.SF UI\\';\\\"><span style=\\\"font-family: \\'.SFUI-Regular\\';\\\">makati Ayala Park Terraces ayala高档公寓，3室1厅4卫。</span></p><p style=\\\"margin: 0px; font-stretch: normal; font-size: 12px; line-height: normal; font-family: \\'.SF UI\\';\\\"><span style=\\\"font-family: \\'.SFUI-Regular\\';\\\">- 带两个阳台/两个车位</span></p><p style=\\\"margin: 0px; font-stretch: normal; font-size: 12px; line-height: normal; font-family: \\'.SF UI\\';\\\"><span style=\\\"font-family: \\'.SFUI-Regular\\';\\\">- 大保姆间/储物间</span></p><p style=\\\"margin: 0px; font-stretch: normal; font-size: 12px; line-height: normal; font-family: \\'.SF UI\\';\\\"><span style=\\\"font-family: \\'.SFUI-Regular\\';\\\">- 高楼层，看马尼拉湾。270平米</span></p><p style=\\\"margin: 0px; font-stretch: normal; font-size: 12px; line-height: normal; font-family: \\'.SF UI\\';\\\"><span style=\\\"font-family: \\'.SFUI-Regular\\';\\\">",
  param: {
    wx: "@hot998 （小飞机）",
    zfj: "@hot998",
    mastermobile: "09158636999",
    price_time: 2,
    images: [
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289803516552375.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289834954829285.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289879503848925.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289880321685773.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289877902045257.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289878713014579.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/166328988111218788.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289883423448772.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289881895867655.jpg",
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289882668616948.jpg",
    ],
    cover:
      "https://oss-ali-hk.wangwanglive.com/pic/20220916/1663289803516552375.jpg",
    tag_list: [
      "绿化率高",
      "交通便捷",
      "物业管理好",
      "配套齐全",
      "学区房",
      "拎包入住",
      "繁华市区",
      "酒店式公寓",
    ],
    content: "",
  },
  display: "1",
  hot: "0",
  payment_state: "1",
  deal: "0",
  click: "79887",
  dateline: "2022-09-16",
  edit_dateline: "1684812452",
  updateline: "2023-07-26",
  topdateline: "",
  is_free: "0",
  o_tilte: "",
  o_content: "",
  url: "https://www.flw.ph/plugin.php?id=fn_house&m=view&iid=4170",
  ftitle: "出租房",
  huxing: "3室",
  province_text: "Metro Manila-Makati",
  display_text: "显示中",
  overdue_text: "",
  see_updateline: "",
  publish_type_text: "个人",
  return_top: 0,
  vice_class_text: "整租",
  price_text: "",
  refresh: 1,
  top: 1,
};

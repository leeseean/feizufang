var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // 处理文件上传的中间件
const prisma = require("../prisma/prisma");
const { DateTime } = require("luxon");
router.get("/", async (req, res) => {
  res.render("postErShou");
});

// 配置 multer 中间件，用于处理文件上传
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const date = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      const directoryPath = path.join(
        process.cwd() + "/public/upload/erShou/" + date,
      );
      if (!fs.existsSync(directoryPath)) {
        // 创建目录
        fs.mkdirSync(directoryPath);
      }
      file.publicPath = "/upload/erShou/" + date;
      cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
      const name = Buffer.from(file.originalname, "latin1").toString("utf-8");
      cb(null, name);
    },
  }),
});

router.post("/", upload.any(), (req, res) => {
  if (!req.session.user) {
    return res.send({
      ok: false,
      msg: "请先登录",
    });
  }
  const files = req.files; //将获取的文件放到files
  const imgs = []; //定义一个空数组
  for (let file of files) {
    //将改完的文件写进空数组
    imgs.push(file.publicPath + "/" + file.filename);
  }
  // 写入数据库
  prisma.er_shou
    .create({
      data: {
        ...req.body,
        created_at: DateTime.local().toISO(),
        imgs,
        username: req.session.user.username,
      },
    })
    .then(() => {
      res.send({
        ok: true,
        msg: "发布成功",
      });
    })
    .catch((e) => {
      res.send({
        ok: false,
        msg: "发布失败",
      });
    });
});

module.exports = router;

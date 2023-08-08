var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // 处理文件上传的中间件
const prisma = require("../prisma/prisma");
router.get("/", async (req, res) => {
  res.render("post");
});

// 配置 multer 中间件，用于处理文件上传
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const date = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      const directoryPath = path.join(
        process.cwd() + "/public/upload/rents/" + date,
      );
      if (!fs.existsSync(directoryPath)) {
        // 创建目录
        fs.mkdirSync(directoryPath);
      }
      cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
      const name = Buffer.from(file.originalname, "latin1").toString("utf-8");
      cb(null, name);
    },
  }),
});

router.post("/", upload.any(), async (req, res) => {
  const files = req.files; //将获取的文件放到files
  const urls = []; //定义一个空数组
  for (let file of files) {
    //将改完的文件写进空数组
    urls.push("/upload/" + file.filename);
  }
  console.log(req.body);
  res.send({
    code: 200,
    msg: "OK",
    data: urls, //返回data给前端预览
  });
});

module.exports = router;

const express = require("express");
const prisma = require("../prisma/prisma");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const {
    pageNumber = 1,
    pageSize = 10,
    city,
    price,
    vice_class,
    room,
  } = req.query;
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;
  const param = {
    skip,
    take,
    orderBy: {
      updateline: "desc", // 按日期降序排序，最近的日期排在前面
    },
    where: {},
  };
  if (city) {
    param.where.city = city;
  }
  if (price) {
    const gt = price.split("-")[0];
    const lt = price.split("-")[1];
    const obj = { gt: +gt };
    if (lt !== "") {
      obj.lt = +lt;
    }
    param.where.price = obj;
  }
  if (vice_class) {
    param.where.vice_class = vice_class;
  }
  if (room) {
    param.where.room = room;
  }
  const rentList = await prisma.rents.findMany(param);
  res.render("index", { rentList });
});

module.exports = router;

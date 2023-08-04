const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma/prisma");
const router = express.Router();
const { dressFilterList, publishTypeList } = require("../utils/staticData");
/* GET home page. */
router.get("/", async function (req, res, next) {
  const {
    pageNumber = 1,
    pageSize = 10,
    city,
    price,
    vice_class,
    room,
    timeFilter,
    roomFilter,
    dressFilter,
    facingFilter,
    furnishFilter,
    tagFilter,
  } = req.query;
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;
  let orderBy = {
    updateline: "desc",
  };
  if (timeFilter === "1") {
    orderBy = {
      dateline: "desc",
    };
  }
  if (timeFilter === "2") {
    orderBy = {
      updateline: "desc",
    };
  }
  const param = {
    skip,
    take,
    orderBy,
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
  if (roomFilter) {
    param.where.house_type = roomFilter;
  }
  if (dressFilter) {
    param.where.decoration_type = dressFilter;
  }
  if (facingFilter) {
    param.where.orientation = facingFilter;
  }
  let rentList = await prisma.rents.findMany(param);
  const ids = rentList.map((item) => item.id).join(",");
  if (furnishFilter && tagFilter) {
    const raw = String.raw`SELECT * FROM feizufang.rents WHERE id IN (${ids}) AND FIND_IN_SET(${furnishFilter}, configure) AND FIND_IN_SET(${tagFilter}, tag);`;
    rentList = await prisma.$queryRawUnsafe(raw);
  } else {
    if (furnishFilter) {
      const raw = `SELECT * FROM feizufang.rents WHERE id IN (${ids}) AND FIND_IN_SET(${furnishFilter}, configure);`;
      rentList = await prisma.$queryRawUnsafe(raw);
    }
    if (tagFilter) {
      const raw = `SELECT * FROM feizufang.rents WHERE id IN (${ids}) AND FIND_IN_SET(${tagFilter}, tag);`;
      rentList = await prisma.$queryRawUnsafe(raw);
    }
  }
  res.render("index", { rentList, dressFilterList, publishTypeList });
});

module.exports = router;

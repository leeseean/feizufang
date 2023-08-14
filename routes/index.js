const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma/prisma");
const router = express.Router();
const {
  dressFilterList,
  publishTypeList,
  tagList,
} = require("../utils/staticData");
/* GET home page. */
router.get("/", async function (req, res, next) {
  const {
    pageNumber = 1,
    pageSize = 10,
    username,
    publish_type,
    title,
    content,
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
  const skip = (Number(pageNumber) - 1) * pageSize;
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
  if (username) {
    param.where.username = username;
  }
  if (publish_type) {
    param.where.publish_type = publish_type;
  }
  if (title) {
    param.where.title = {
      contains: title,
    };
  }
  if (content) {
    param.where.content = {
      contains: content,
    };
  }
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

  let rentList = await prisma.rentlist.findMany(param);
  const param2 = { ...param };
  delete param2.skip;
  delete param2.take;
  let totalRecords = await prisma.rentlist.count(param2);
  const ids = rentList.map((item) => item.id).join(",");
  if (ids) {
    if (furnishFilter && tagFilter) {
      const raw = String.raw`SELECT * FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${furnishFilter}', configure) AND FIND_IN_SET('${tagFilter}', tag);`;
      rentList = await prisma.$queryRawUnsafe(raw);
      const raw2 = String.raw`SELECT COUNT(*) FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${furnishFilter}', configure) AND FIND_IN_SET('${tagFilter}', tag);`;
      totalRecords = await prisma.$queryRawUnsafe(raw2);
    } else {
      if (furnishFilter) {
        const raw = `SELECT * FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${furnishFilter}', configure);`;
        rentList = await prisma.$queryRawUnsafe(raw);
        const raw2 = `SELECT COUNT(*) FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${furnishFilter}', configure);`;
        totalRecords = await prisma.$queryRawUnsafe(raw2);
      }
      if (tagFilter) {
        const raw = `SELECT * FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${tagFilter}', tag);`;
        rentList = await prisma.$queryRawUnsafe(raw);
        const raw2 = `SELECT * FROM feizufang.rentlist WHERE id IN (${ids}) AND FIND_IN_SET('${tagFilter}', tag);`;
        totalRecords = await prisma.$queryRawUnsafe(raw2);
      }
    }
  }

  res.render("index", {
    pageNav: "rent",
    rentList,
    dressFilterList,
    publishTypeList,
    tagList,
    totalPages: Math.ceil(totalRecords / pageSize),
    pageNumber,
  });
});

module.exports = router;

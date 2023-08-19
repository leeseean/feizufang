var express = require("express");
var router = express.Router();
const prisma = require("../prisma/prisma");

router.get("/", async (req, res) => {
  const { pageNumber = 1, pageSize = 8, searchText = "" } = req.query;
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;
  let param = {
    orderBy: {
      created_at: "desc",
    },
  };
  if (searchText) {
    param = {
      orderBy: {
        created_at: "desc",
      },
      where: {
        content: {
          contains: searchText,
        },
      },
    };
  }
  console.log(searchText);
  const list = await prisma.er_shou.findMany({
    skip,
    take,
    ...param,
  });
  const totalRecords = await prisma.er_shou.count(param);
  res.render("erShou", {
    pageNav: "erShou",
    list,
    totalPages: Math.ceil(totalRecords / pageSize),
    pageNumber,
  });
});
router.get("/imgs", async (req, res) => {
  const resp = await prisma.er_shou.findMany();
  const list = resp.map((item) => item.oss_imgs);
  return res.json(list);
});
module.exports = router;

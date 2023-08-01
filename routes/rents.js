var express = require("express");
var router = express.Router();
const prisma = require("../prisma/prisma");

router.get("/", async (req, res) => {
  const { pageNumber = 1, pageSize = 10 } = req.body;
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;
  const list = await prisma.rents.findMany({
    skip,
    take,
  });
  return list;
  console.log(list);
});
module.exports = router;

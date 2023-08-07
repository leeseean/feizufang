var express = require("express");
var router = express.Router();
const prisma = require("../prisma/prisma");
const {
  roomFilterList,
  dressFilterList,
  tagList,
  orientationFilterList,
  viceList,
  furnishList,
} = require("../utils/staticData");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const detail = await prisma.rents.findFirst({
    where: {
      id,
    },
  });
  console.log(detail);
  res.render("detail", {
    detail,
    orientationFilterList,
    roomFilterList,
    tagList,
    dressFilterList,
    viceList,
    furnishList,
  });
});

module.exports = router;

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
  const detail = await prisma.rentlist.findFirst({
    where: {
      id: Number(id),
    },
  });
  res.render("detail", {
    locationOrigin: req.protocol + "://" + req.get("host"),
    currentHref: req.protocol + "://" + req.get("host") + req.originalUrl,
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

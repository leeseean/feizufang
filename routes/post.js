var express = require("express");
var router = express.Router();
const prisma = require("../prisma/prisma");

router.get("/", async (req, res) => {
  res.render("post");
});
router.post("/", async (req, res) => {
  console.log(req.body);
});
module.exports = router;

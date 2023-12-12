const router = require("express").Router();
const postService = require("../services/postService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/catalog", async (req, res) => {
  res.render("posts/catalog");
});

router.get("/create", isAuth, (req, res) => {
  res.render("posts/create");
});

module.exports = router;

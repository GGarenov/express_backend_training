const router = require("express").Router();
const postService = require("../services/postService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/catalog", async (req, res) => {
  const posts = await postService.getAll().lean();
  res.render("posts/catalog", { posts });
});

router.get("/create", isAuth, (req, res) => {
  res.render("posts/create");
});

router.post("/create", async (req, res) => {
  const { name, type, damages, image, description, production, exploitation, price } = req.body;

  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };

  try {
    await postService.create(payload);
    res.redirect("/posts/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
});

module.exports = router;

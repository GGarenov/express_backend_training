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

router.get("/:postId/details", async (req, res) => {
  const { postId } = req.params;

  const post = await postService.singlePost(postId).lean();
  const { user } = req;
  const { owner } = post;
  const isOwner = user?._id === owner.toString();
  const hasBought = post.buyingList?.some((b) => b?._id.toString() === user?._id);
  const joinedEmailsOfOwners = post.buyingList.map((b) => b.email).join(", ");

  res.render("posts/details", { post, isOwner, hasBought, joinedEmailsOfOwners });
});

router.get("/:postId/edit", async (req, res) => {
  const { postId } = req.params;

  const post = await postService.singlePost(postId).lean();
  res.render("posts/edit", { post });
});

router.post("/:postId/edit", async (req, res) => {
  const { postId } = req.params;
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

  await postService.update(postId, payload);
  res.redirect(`/posts/${postId}/details`);
});

router.get("/:postId/delete", async (req, res) => {
  const { postId } = req.params;

  await postService.delete(postId);
  res.redirect("/posts/catalog");
});

router.get("/:postId/buy", async (req, res) => {
  const { postId } = req.params;
  const { _id } = req.user;
  console.log({ _id });

  await postService.addBuyToPost(postId, _id);

  res.redirect(`/posts/${postId}/details`);
});

module.exports = router;

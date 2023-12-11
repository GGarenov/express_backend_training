const router = require("express").Router();
const userService = require("../services/userService");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { email, username, password, repassword } = req.body;

  await userService.register({ email, username, password, repassword });

  res.redirect("/users/login");
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;

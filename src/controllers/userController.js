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

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const token = await userService.login(email, password);
  console.log({ token });

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;

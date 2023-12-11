const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();

const { PORT, DB_URL } = require("./constants");
const { default: mongoose } = require("mongoose");

//Express Config

app.use(express.static(path.resolve(__dirname, "./public")));

//Handlebars Config
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//Home page router

app.get("/", (req, res) => {
  res.render("home");
});

//Database config

async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => {
    console.log("Uspeshno se vurzahme za bazata s danni!");
  })
  .catch((err) => console.log(`Error while connecting to the DB. ${err}`));

//Other Routes

app.get("/users/login", (req, res) => {
  res.render("users/login");
});

app.get("/users/register", (req, res) => {
  res.render("users/register");
});

app.get("/posts/catalog", (req, res) => {
  res.render("posts/catalog");
});

app.get("/posts/create", (req, res) => {
  res.render("posts/create");
});

app.get("/posts/details", (req, res) => {
  res.render("posts/details");
});

app.get("/posts/edit", (req, res) => {
  res.render("posts/edit");
});
app.get("/posts/search", (req, res) => {
  res.render("posts/search");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

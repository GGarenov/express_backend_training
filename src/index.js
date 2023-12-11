const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const app = express();
const port = 3000;

//Express Config

app.use(express.static(path.resolve(__dirname, "./public")));

//Handlebars Config
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");

const { PORT, DB_URL } = require("./constants");
const routes = require("./router");

//App init
const app = express();

// Express Configurations
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));

// Configure Handlebars
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

//Database Connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => {
    console.log(`Uspeshno se vurzahme kum bazata s danni`);
  })
  .catch((err) => console.log(`Error while connecting to the database. Error: ${err}`));

//Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} ...`);
});

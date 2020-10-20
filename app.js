const express = require("express");
const mongoose = require("mongoose");
const exhbs = require("express-handlebars");
const port = 3000;
const app = express();
const Record = require('./models/Record')

//set template engine
app.engine("hbs", exhbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

//set mongodb
mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
});


//set route
app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render("index", { records }))
    .catch(error => console.log(error))
});



app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

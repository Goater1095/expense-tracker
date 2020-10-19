const mongoose = require("mongoose");
const Record = require("../Record");

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
  for (let i = 0; i < 5; i++) {
    Record.create({ name: "name-" + i, amount: 10 * i });
  }
  console.log("recordSeeder done");
});

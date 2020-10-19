const mongoose = require("mongoose");
const Record = require("../Record");

mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
const categoryList = ["家居物業", "交通出行", "休閒娛樂", , "餐飲食品", "其他"];
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: "name-" + i,
      category: categoryList[i],
      amount: 9 * i,
    });
  }
  console.log("categorySeeder done");
});

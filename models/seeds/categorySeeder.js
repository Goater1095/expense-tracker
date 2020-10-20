const mongoose = require("mongoose");
const Record = require("../Record");

mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
const categoryList = ["家居物業", "交通出行", "休閒娛樂", , "餐飲食品", "其他"];
const imageList = ['fa-home', 'fa-shuttle-van', 'fa-grin-beam', 'fa-utensils', 'fa-pen']

db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  for (let i = 0; i < 5; i++) {
    Record.create({
      name: "name-" + i,
      category: categoryList[i],
      image: imageList[i],
      amount: 9 * i,
      date: `2020/${i + 1}/${i + 2}`
    });
  }
  console.log("categorySeeder done");
});
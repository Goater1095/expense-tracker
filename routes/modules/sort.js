const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const { categoryList, imageList, monthList } = require('../../config/setList');

router.get('/', (req, res) => {
  const { month, category } = req.query;
  const categoryTrue = categoryList.map((item) => item === category);
  const monthTrue = monthList.map((item) => item === month);
  const userId = req.user._id;

  Record.find({ userId })
    .lean()
    .then((records) => {
      if (category !== '全部支出') {
        records = records.filter((item) => item.category === category);
      }
      if (month !== '月份') {
        records = records.filter(
          (item) => new Date(item.date).getMonth().toString() === month
        );
      }

      let totalAmount = 0;
      for (let record of records) {
        totalAmount += record.amount;
      }
      res.render('index', {
        records,
        totalAmount,
        category0: categoryTrue[0],
        category1: categoryTrue[1],
        category2: categoryTrue[2],
        category3: categoryTrue[3],
        category4: categoryTrue[4],
        month0: monthTrue[0],
        month1: monthTrue[1],
        month2: monthTrue[2],
        month3: monthTrue[3],
        month4: monthTrue[4],
        month5: monthTrue[5],
        month6: monthTrue[6],
        month7: monthTrue[7],
        month8: monthTrue[8],
        month9: monthTrue[9],
        month10: monthTrue[10],
        month11: monthTrue[11],
      });
    })
    .catch((error) => console.log(error));
});

module.exports = router;

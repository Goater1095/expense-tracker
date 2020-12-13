const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.get('/', (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  Record.find({ userId })
    .lean()
    .then((records) => {
      console.log('有近來', records);
      let totalAmount = 0;
      for (let record of records) {
        totalAmount += record.amount;
      }
      res.render('index', { records, totalAmount });
    })
    .catch((error) => console.log(error));
});

module.exports = router;

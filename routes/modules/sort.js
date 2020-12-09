const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');

router.get('/:category', (req, res) => {
  const category = req.params.category;
  Record.find({ category })
    .lean()
    .then((records) => {
      let totalAmount = 0;
      for (let record of records) {
        totalAmount += record.amount;
      }
      res.render('index', { records, totalAmount });
    })
    .catch((error) => console.log(error));
});

module.exports = router;

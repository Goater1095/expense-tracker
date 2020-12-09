const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const categoryList = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他'];
const imageList = ['fa-home', 'fa-shuttle-van', 'fa-grin-beam', 'fa-utensils', 'fa-pen'];

router.get('/new', (req, res) => {
  return res.render('new');
});
router.post('/', (req, res) => {
  const record = req.body;
  let index = categoryList.findIndex((item) => item === record.category);
  record.image = imageList[index];
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

//CR"U"D
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  Record.findById(id)
    .lean()
    .then((record) => {
      const categoryTrue = categoryList.map((item) => item === record.category);
      res.render('edit', {
        record,
        category0: categoryTrue[0],
        category1: categoryTrue[1],
        category2: categoryTrue[2],
        category3: categoryTrue[3],
        category4: categoryTrue[4],
      });
    })
    .catch((error) => console.log(error));
});

router.post('/:id/edit', (req, res) => {
  const id = req.params.id;
  const editRecord = req.body;
  let index = categoryList.findIndex((item) => item === editRecord.category);
  editRecord.image = imageList[index];
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, editRecord);
      return record.save();
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

//CRU"D"
router.get('/:id/delete', (req, res) => {
  const id = req.params.id;
  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

module.exports = router;

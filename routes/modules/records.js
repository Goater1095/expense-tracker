const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const { categoryList, imageList } = require('../../config/setList');

router.get('/new', (req, res) => {
  return res.render('new');
});
router.post('/', (req, res) => {
  const record = req.body;
  const { name, category, date, amount } = req.body;
  const categoryTrue = categoryList.map((item) => item === record.category);
  if (!name || !category || !date || !amount) {
    // req.flash('newError', '所有欄位都是必填。'); //方法一: 第一次沒填欄位不會有訊息 (要他配redirect 重回客戶端發送請求才會經過app.use(flash());
    const newError = '所有欄位都是必填'; //方法二
    return res.render('new', {
      newError, //方法二
      name,
      date,
      amount,
      category0: categoryTrue[0],
      category1: categoryTrue[1],
      category2: categoryTrue[2],
      category3: categoryTrue[3],
      category4: categoryTrue[4],
    });
  }

  let index = categoryList.findIndex((item) => item === record.category);
  record.image = imageList[index];
  record.userId = req.user._id;
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  Record.findOne({ _id: id, userId })
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
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  const editRecord = req.body;
  let index = categoryList.findIndex((item) => item === editRecord.category);
  editRecord.image = imageList[index];
  return Record.findOne({ _id: id, userId })
    .then((record) => {
      record = Object.assign(record, editRecord);
      return record.save();
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  return Record.findOne({ _id: id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

module.exports = router;

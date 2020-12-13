const db = require('../../config/mongoose');
const { categoryList, imageList } = require('../../config/setList');
const Category = require('../Category');

db.once('open', () => {
  console.log('mongodb connected categorySeeder!');
  Promise.all(
    Array.from({ length: categoryList.length }, (_, i) =>
      Category.create({ category: categoryList[i], image: imageList[i] })
    )
  ).then(() => {
    console.log('categorySeeder done!');
    db.close();
  });
});

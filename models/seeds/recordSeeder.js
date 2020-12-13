const bcrypt = require('bcryptjs');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const db = require('../../config/mongoose');
const Record = require('../Record');
const User = require('../User');
const { categoryList, imageList } = require('../../config/setList');
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
};

db.once('open', () => {
  console.log('mongodb connected recordSeeder!');
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      Promise.all(
        Array.from({ length: categoryList.length }, (_, i) =>
          Record.create({
            name: `種子支出第${i}號`,
            category: categoryList[i],
            image: imageList[i],
            amount: 9 * i,
            date: `2020-0${i + 1}-0${i + 2}`,
            merchant: '種子自營',
            userId,
          })
        )
      ).then(() => {
        console.log('recordSeeder done!');
        db.close();
      });
    });
});

const mongoose = require('mongoose');
const Record = require('../Record');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});
db.once('open', () => {
  console.log('mongodb connected!');
  for (let i = 0; i < 5; i++) {
    Record.create({ name: 'name-' + i, amount: 10 * i });
  }
  console.log('recordSeeder done');
});

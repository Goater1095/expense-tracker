const express = require('express');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense';
const app = express();

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//set mongodb
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
});

//set use
app.use(bodyParser.urlencoded({ extends: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

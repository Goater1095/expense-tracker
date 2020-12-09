const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes');
const session = require('express-session');

const port = process.env.PORT || 3000;
const app = express();
require('./config/mongoose'); //被require的會執行

app.use(
  session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: true,
  })
);

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

//set use
app.use(bodyParser.urlencoded({ extends: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

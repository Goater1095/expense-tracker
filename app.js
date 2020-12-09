const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const userPassport = require('./config/passport');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();
require('./config/mongoose'); //被require的會執行

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extends: true }));

app.use(
  session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: true,
  })
);
userPassport(app);

app.use(routes);

app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

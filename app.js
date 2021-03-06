const express = require('express');
const exhbs = require('express-handlebars');
var helpers = require('handlebars-helpers')();
// const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const userPassport = require('./config/passport');
const routes = require('./routes');

const port = process.env.PORT;
const app = express();
require('./config/mongoose'); //被require的會執行

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

userPassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.error = req.flash('error');
  res.locals.newError = req.flash('newError');
  next();
});
app.use(methodOverride('_method'));
app.use(routes);

app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

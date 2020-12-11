const express = require('express');
const exhbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const userPassport = require('./config/passport');
const routes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();
require('./config/mongoose'); //被require的會執行

//set template engine
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'MySecret',
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

app.use(routes);

app.listen(port, () => {
  console.log(`Express Server is start on http://localhost:${port}`);
});

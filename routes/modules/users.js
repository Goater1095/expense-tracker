const express = require('express');
const passport = require('passport');
const User = require('../../models/User');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
);

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    console.log('所有欄位都是必填');
  }
  if (password !== confirmPassword) {
    console.log('密碼與確認密碼不符');
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('這個Email 已經註冊過');
      return res.render('register', name, email.password, confirmPassword);
    }
    return User.create({ name, email, password })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  });
});
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
  console.log('已經成功登出');
});
module.exports = router;

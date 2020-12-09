const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
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
  console.log('Logout');
});
module.exports = router;

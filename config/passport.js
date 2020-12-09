const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (app) => {
  //初始化
  app.use(passport.initialize());
  app.use(passport.session());
  //設定策略
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'The email not register!' });
          }
          if ((password = !user.password)) {
            return done(null, false, {
              message: 'Incorrect email or password.',
            });
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );
  //序列反序列
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null)); //第一個參數err 後面其實可以不用船參數 用null代表語意沒有
  });
};

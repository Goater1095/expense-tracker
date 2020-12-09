const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const sort = require('./modules/sort');
const records = require('./modules/records');
const users = require('./modules/users');
const { authenticator } = require('../middleware/auth');

router.use('/sort', authenticator, sort);
router.use('/records', authenticator, records);
router.use('/users', users);
router.use('/', authenticator, home);

module.exports = router;

const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const sort = require('./modules/sort');
const records = require('./modules/records');
const users = require('./modules/users');

router.use('/', home);
router.use('/sort', sort);
router.use('/records', records);
router.use('/users', users);

module.exports = router;

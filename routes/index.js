const express = require('express');
const router = express.Router();
const home = require('./modules/home');
const sort = require('./modules/sort');
const records = require('./modules/records');

router.use('/', home);
router.use('/sort', sort);
router.use('/records', records);

module.exports = router;

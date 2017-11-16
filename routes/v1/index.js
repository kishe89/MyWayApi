const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
/* GET home page. */
router.use('/auth', auth);
router.use('/users', user);
module.exports = router;

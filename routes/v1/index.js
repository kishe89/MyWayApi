const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const article = require('./article');
/* GET home page. */
router.use('/auth', auth);
router.use('/users', user);
router.use('/articles',article);
module.exports = router;

const express = require('express');
const router = express.Router();
const index = require('./api/index');
/* GET home page. */
router.get('/api', index);

module.exports = router;

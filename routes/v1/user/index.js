const express = require('express');
const router = express.Router();
const create = require('./api/create');
const find = require('./api/find');
const profile = require('./api/profile');
/* GET home page. */
router.get('/', find);
router.post('/', create);
router.get('/profile',profile);
module.exports = router;

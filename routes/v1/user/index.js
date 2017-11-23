const express = require('express');
const router = express.Router();
const create = require('./api/create');
const find = require('./api/find');
const profile = require('./api/profile');
const my_friends = require('./api/my_friends');
const friends = require('./api/friends');
const create_friends = require('./api/create_friends');
const friended = require('./api/friended');
const unfriended = require('./api/unfriended');
const upload_profile = require('./api/upload_profile');

/* GET home page. */
router.get('/', find);
router.post('/', create);
router.get('/profile',profile);
router.post('/profile',upload_profile);

router.get('/my_friends',my_friends);
router.get('/friends/:Nick/:App/:AppId',friends);
router.post('/friends/:Nick/:App/:AppId',create_friends);
router.put('/friends/:Nick/:App/:AppId',friended);
router.delete('/friends/:Nick/:App/:AppId',unfriended);
module.exports = router;

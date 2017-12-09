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
const loggedin = require('./api/loggedin');
const cors = require('cors');
/* GET home page. */
router.get('/',cors() ,find);
router.post('/',cors() , create);
router.post('/login',cors(), loggedin());
router.get('/profile',cors() ,profile);
router.post('/profile',cors() ,upload_profile);

router.get('/my_friends',cors() ,my_friends);
router.get('/friends/:Nick/:App/:AppId',cors() ,friends);
router.post('/friends/:Nick/:App/:AppId',cors() ,create_friends);
router.put('/friends/:Nick/:App/:AppId',cors() ,friended);
router.delete('/friends/:Nick/:App/:AppId',cors() ,unfriended);
module.exports = router;

const express = require('express');
const router = express.Router();
const find = require('./api/find')
const create_article = require('./api/create_article');
const multer  = require('multer');
const storageEngine = require('../../../util/ObjectStorageEngine');
const upload = multer({
    storage:storageEngine({
        destination:  (req, file, cb)=> {
            cb(null, 'article')
        }
    })
});
router.get('/',find);
router.post('/',upload.fields([{name:'photos',maxCount:5},{name:'kml',maxCount:1}]),create_article);

module.exports = router;
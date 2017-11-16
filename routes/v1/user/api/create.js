module.exports = function(req, res, next) {
    let User = require('../../../../model/User');
    let multiparty = require('multiparty');
    let AsyncUploadObjectStorage = require('../util/AsyncUpload');
    let bcrypt = require('bcrypt-nodejs');
    let form = new multiparty.Form();
    let fieldMap = new Map();
    let Task = [];
    let randompass = require('../util/random.js');
    form.on('field',function (name, value) {
        fieldMap.set(name,value);
    });
    form.on('part',function (part) {
        if (part.filename) {
            let filename = part.filename;
            filename = 'post_'+Date.now()+filename;
            fieldMap.set('Profile', filename);
        }else{
            part.resume();
        }

        Task.push(new AsyncUploadObjectStorage(part,fieldMap.get('Profile'),req));
    });
    form.on('close',function () {
        if(Task.length == 0){
            let error = new Error('Bad Request');
            error.status = 400;
            next(error,req,res,next);
            return;
        }
        Promise.all(Task).then(function (allData) {
            const DecryptValue = randompass();
            const strictValue = bcrypt.hashSync(DecryptValue, bcrypt.genSaltSync(8), null);
            let user = new User({
                Nick:fieldMap.get('Nick'),
                App:fieldMap.get('App'),
                AppId:fieldMap.get('AppId'),
                Profile:fieldMap.get('Profile'),
                AccessToken: strictValue,
                DecryptValue:DecryptValue
            });

            user.save().then(function (result) {
                if(!result){
                    console.error(result);
                    let error = new Error('User Save Fail');
                    throw error;
                }else{
                    res.json(result);
                }
            }).catch(function (error) {
                console.error(error);
                error.status = 500;
                next(error,req,res,next);
            });
        }).catch(function (err) {
            console.error(err);
            let error = new Error('filesave error : '+err);
            error.status = 500;
            next(error,req,res,next);
        });
    });
    form.parse(req);
};
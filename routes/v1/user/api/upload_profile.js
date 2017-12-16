module.exports = function(req, res, next) {
    let User = require('../../../../model/User');
    let multiparty = require('multiparty');
    let AsyncUploadObjectStorage = require('../util/AsyncUpload');
    let bcrypt = require('bcrypt-nodejs');
    let form = new multiparty.Form();
    let fieldMap = new Map();
    let Task = [];
    form.on('field',function (name, value) {
        fieldMap.set(name,value);
    });
    form.on('part',function (part) {
        if (part.filename) {
            let filename = part.filename;
            filename = 'Profile_'+Date.now()+filename;
            fieldMap.set('Profile', filename);
        }else{
            part.resume();
        }

        Task.push(new AsyncUploadObjectStorage(part,fieldMap.get('Profile'),req));
    });
    form.on('close',function () {
        if(Task.length === 0){
            let error = new Error('Bad Request');
            error.status = 400;
            next(error,req,res,next);
            return;
        }
        Promise.all(Task).then(function () {
            const Nick = fieldMap.get('Nick');
            const App = fieldMap.get('App');
            const AppId = fieldMap.get('AppId');
            const AccessToken = req.headers['x-access-token'];
            const find = (user)=>{
                if(user){
                    bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                        if(err){
                            console.log(user.DecryptValue);
                            console.log(AccessToken);
                            console.log(err);
                            const error = new Error('AccessToken Invalid');
                            error.status = 401;
                            next(error,req,res,next);
                        }else{
                            user.DecryptValue = '';
                            res.json(user);
                        }
                    });
                }else{
                    const error = new Error('User Not Found');
                    error.status = 404;
                    throw error;
                }
            };
            const onError = (error)=>{
                next(error,req,res,next);
            };
            User.findOne({Nick:Nick,App:App,AppId:AppId})
                .select({Nick:1,App:1,AppId:1,Profile:1})
                .exec()
                .then(find)
                .catch(onError);
        }).catch(function (err) {
            console.error(err);
            let error = new Error('filesave error : '+err);
            error.status = 500;
            next(error,req,res,next);
        });
    });
    form.parse(req);
};
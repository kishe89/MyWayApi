/**
 * user loggedin request
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next)=>{
    const User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const {Nick,App,AppId} = req.body;

    const find = (user)=>{
        return new Promise((resolve, reject)=>{
            if(user){
                bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                    if(err){
                        const error = new Error('AccessToken Invalid');
                        error.status = 401;
                        reject(error);
                    }else{
                        resolve(user);
                    }

                });
            }else{
                const error = new Error('User Not Found');
                error.status = 404;
                reject(error);
            }
        });
    }
    const response = (user)=>{
        res.json(user);
    };
    const onError = (error)=>{
        next(error,req,res,next);
    }
    User.findOne({Nick:Nick,App:App,AppId:AppId})
        .exec()
        .then(find)
        .then(response)
        .catch(onError);
};
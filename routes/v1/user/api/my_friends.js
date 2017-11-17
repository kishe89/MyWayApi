/**
 * CreatedAt 2017-11-17 14:49:00 kst
 * by kim ji woon
 */

module.exports = (req,res,next) =>{
    const User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const {Nick,App,AppId} = req.query;
    const AccessToken = req.headers['x-access-token'];
    const find = (user)=>{
        if(user){
            bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                if(err){
                    const error = new Error('AccessToken Invalid');
                    error.status = 401;
                    next(error,req,res,next);
                }else{
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
        .populate({path:'Friends',select:'_id Nick App'})
        .populate({path:'Agree_Wait_Friends',select:'_id Nick App'})
        .exec()
        .then(find)
        .catch(onError);
};
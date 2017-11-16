module.exports = function(req, res, next) {
    let User = require('../../../../model/User');
    let bcrypt = require('bcrypt-nodejs');
    const {Nick,App,AppId,AccessToken} = req.query;

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

    User.findOne({Nick:Nick,App:App,AppId:AppId}).exec()
        .then(find)
        .catch(onError);
};
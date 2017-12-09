/**
 * user loggedin request
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next)=>{
    const User = require('../../../../model/User');
    const {Nick,App,AppId} = req.body;

    const find = (user)=>{
        return new Promise((resolve, reject)=>{
            if(user){
                resolve(user);
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
        if(error.status != 500){
            res.status(error.status).send(error);
            return;
        }
        next(error,req,res,next);
    }
    User.findOne({Nick:Nick,App:App,AppId:AppId})
        .exec()
        .then(find)
        .then(response)
        .catch(onError);
};
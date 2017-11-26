/**
 * CreatedAt 2017-11-17 14:49:00 kst
 * by kim ji woon
 */

module.exports = (req, res, next) =>{
    const User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const {Nick,App,AppId} = req.params;
    const {_id} = req.query;
    const AccessToken = req.headers['x-access-token'];
    const find = (user)=>{
        if(user){
            bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                if(err){
                    const error = new Error('AccessToken Invalid');
                    error.status = 401;
                    next(error,req,res,next);
                }else{
                    const aggreFriended = (user)=>{
                        if(user.Agree_Wait_Friends.length !==0){
                            return User.update({_id:user._id},{$addToSet:{Friends:_id},$pull:{Agree_Wait_Friends:_id}})
                                .exec()
                                .then((result)=>{
                                    return {result:result,user:user};
                                });
                        }else{
                            return new Promise((resolve,reject)=>{
                                const error = new Error('Not exist Agree_Wait_Friends');
                                error.status = 404;
                                reject(error);
                            });
                        }
                    };
                    const resultCheck = (result)=>{
                        if((result.result.nModified >=1) && (result.result.n >=1)){

                            User.findOne({_id:result.user._id},{AccessToken:0,DecryptValue:0})
                                .populate({path:'Friends',select:'Nick App AppId',match:{_id:_id}})
                                .exec()
                                .then((updatedUser)=>{
                                    User.update({_id:_id},{$addToSet:{Friends:result.user._id}})
                                        .exec()
                                        .then(()=>{
                                            res.json(updatedUser);
                                        })
                                        .catch((error)=>{
                                            console.log(error);
                                            error.status = 500;
                                            throw error;
                                        });
                                })
                                .catch((error)=>{
                                    console.log(error);
                                    error.status = 500;
                                    throw error;
                                });
                        }
                        else if((result.result.nModified===0)&&(result.result.n >=1)){
                            res.status(409).send();
                        }
                        else{
                            const error = new Error('Friended Fail');
                            error.status = 500;
                            throw error;
                        }
                    };
                    const onError = (error)=>{
                        next(error,req,res,next);
                    };
                    aggreFriended(user)
                        .then(resultCheck)
                        .catch(onError)
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
        .populate({path:'Agree_Wait_Friends',select:'_id Nick App',match:{_id:_id}})
        .exec()
        .then(find)
        .catch(onError);

};
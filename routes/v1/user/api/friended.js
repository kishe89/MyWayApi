/**
 * CreatedAt 2017-11-17 14:49:00 kst
 * by kim ji woon
 */

module.exports = (req,res,next) =>{
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
                    const findFriend = (friend)=>{
                        if(!friend){
                            const error = new Error('Friend Info Not Found');
                            error.status = 404;
                            throw error;
                        }
                        return friend;
                    };
                    const findFriend_onError = (error)=>{
                        next(error,req,res,next);
                    };
                    const Friended = (friend)=>{
                        User.update({_id:user._id},{$addToSet:{Agree_Wait_Friends:friend._id}})
                            .exec()
                            .then((result)=>{
                                return result;
                            })
                            .then((result)=>{
                            console.log(result)
                                if((result.nModified >=1) && (result.n >=1)){
                                    User.findOne({_id:user._id},{AccessToken:0,DecryptValue:0})
                                        .populate({path:'Agree_Wait_Friends',select:'Nick App AppId'})
                                        .exec()
                                        .then((updatedUser)=>{
                                            res.json(updatedUser);
                                        })
                                        .catch((error)=>{
                                            console.log(error);
                                            error.status = 500;
                                            throw error;
                                        });
                                }else if((result.nModified===0)&&(result.n >=1)){
                                    res.status(409).send();
                                }else{
                                    const error = new Error('Friended Fail');
                                    error.status = 500;
                                    throw error;
                                }
                            })
                            .catch((error)=> {
                                console.log(error);
                                error.status = 500;
                                throw error;
                        });
                    };
                    User.findOne({_id:_id})
                        .exec()
                        .then(findFriend)
                        .then(Friended)
                        .catch(findFriend_onError);
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
        .exec()
        .then(find)
        .catch(onError);
};
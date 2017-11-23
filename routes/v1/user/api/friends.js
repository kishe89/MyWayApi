/**
 * CreatedAt 2017-11-17 14:49:00 kst
 * by kim ji woon
 */

module.exports = (req, res, next) =>{
    const User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const {Nick,App,AppId} = req.params;
    const {FriendNick,page_no} = req.query;
    const AccessToken = req.headers['x-access-token'];
    const page_start = page_no*1000;
    const page_end = 1000;


    const find = (user)=>{
        if(user){

            bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                if(err){
                    const error = new Error('AccessToken Invalid');
                    error.status = 401;
                    next(error,req,res,next);
                }else{

                    const status_check = (friends)=>{
                        const status_change = new Promise(function (resolve) {
                            if(friends.length!==0){
                                const FriendsString = JSON.stringify(user.Friends);
                                console.log(FriendsString);
                                friends.forEach(function (friend, index,friends) {
                                    friends[index] = {
                                        _id:friend._id,
                                        Nick:friend.Nick,
                                        App:friend.App,
                                        AppId:friend.AppId,
                                        Profile:friend.Profile,
                                        Friends:friend.Friends,
                                        MyFriend:0
                                    };
                                    if(FriendsString.includes(friend._id)){
                                        friends[index].MyFriend=1;
                                    }
                                    if(friends.length-1 === index){
                                        resolve(friends);
                                    }
                                });
                            }else{
                                resolve(friends);
                            }
                        });
                        if(user.Friends.length!==0){
                            if(friends.length !==0){
                                console.log('come');
                                status_change.then((ChangedFriends)=>{
                                    res.json(ChangedFriends);
                                }).catch(function (err) {
                                    err.status = 500;
                                    next(err,req,res,next);
                                });
                            }
                            else{
                                /**
                                 * user는 친구들을 가지고 있지만 현재 검색어에 맞는 친구리스트 없을 때
                                 */
                                res.json(friends);
                            }
                        }
                        else{
                            /**
                             * user는 친구가 없다.
                             */
                            status_change.then((ChangedFriends)=>{
                                res.json(ChangedFriends);
                            }).catch(function (err) {
                                err.status = 500;
                                next(err,req,res,next);
                            });
                        }
                    };
                    User.find({Nick:{ "$regex": FriendNick, "$options": "i" }})
                        .skip(page_start)
                        .limit(page_end)
                        .select({
                            _id:1,
                            Nick:1,
                            App:1,
                            AppId:1,
                            Friends:1,
                            Profile:1
                        })
                        .exec()
                        .then(status_check);
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
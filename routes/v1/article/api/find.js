/**
 * CreatedAt 2017-11-18 15:10:00 kst
 * by kim ji woon
 */

module.exports = (req,res,next)=>{
    let User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const Article = require('../../../../model/Article');
    const Article_Item = require('../../../../model/ArticleItem');
    const {Nick,App,AppId,page_no} = req.query;
    const page_start = page_no*1000;
    const page_end = 1000;
    const AccessToken = req.headers['x-access-token'];

    const find = (user)=>{
        if(user){
            bcrypt.compare(user.DecryptValue,AccessToken,function (err) {
                if(err){
                    const error = new Error('AccessToken Invalid');
                    error.status = 401;
                    next(error,req,res,next);
                }else{
                    const FindArticles = (articles)=>{
                        /**
                         * TODO article exist check
                         */
                        console.log(user);
                        return articles;
                    };
                    const FilterArticles = (articles)=>{
                        /**
                         * TODO public range & relationship check
                         * Publish_range 0 전체 공개, 1 친구 공개, 2 비공개
                         */
                        articles.slice().reverse().forEach(function(article,index,current_array){
                            console.log(index+':'+current_array.length);
                            switch (article.Publish_range){
                                case 0:
                                    break;
                                case 1:
                                    if(!(article.PostedBy.Friends.indexOf(user._id)>-1)){
                                        console.log('freinds');
                                        console.log((article.PostedBy._id === user._id)+':'+index+':'+(current_array.length-1));
                                        articles.splice(((current_array.length-1)-index),1);
                                    }
                                    break;
                                case 2:
                                    if(!(article.PostedBy._id === user._id)){
                                        console.log('private');
                                        console.log((article.PostedBy._id === user._id)+':'+index+':'+(current_array.length-1));
                                        articles.splice(((current_array.length-1)-index),1);
                                    }
                                    break;
                                default:
                                    break;

                            }
                        });


                        res.json(articles);
                    };
                    const FindArticlesOnError = (error)=>{
                        next(error,req,res,next);
                    };

                    Article.find({})
                        .sort({UpdatedAt:-1})
                        .populate({path:'Article_List'})
                        .populate({path:'PostedBy'})
                        .skip(page_start)
                        .limit(page_end)
                        .exec()
                        .then(FindArticles)
                        .then(FilterArticles)
                        .catch(FindArticlesOnError)
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
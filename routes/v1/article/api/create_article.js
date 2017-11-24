/**
 * CreatedAt 2017-11-19 15:07:00 kst
 * by kim ji woon
 */

module.exports = (req,res,next)=>{
    const User = require('../../../../model/User');
    const bcrypt = require('bcrypt-nodejs');
    const Article = require('../../../../model/Article');
    const AsyncArticleItemSavePromise = require('../util/ArticleItemSavePromise');

    const photos = req.files['photos'];
    const kml = req.files['kml'];
    const AccessToken = req.headers['x-access-token'];
    const {articleItems,Nick,App,AppId,Contents,Publish_range} = req.body;

    const find = (user)=>{
        return new Promise((resolve,reject)=>{
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
    };
    const createArticleItemSaveTask = (user)=>{
        let Task =[];
        articleItems.forEach((item)=>{
            Task.push(new AsyncArticleItemSavePromise(item,user));
        });
        let object = {
            Task:Task,
            user:user
        }
        return object;
    };
    const ArticleItemSaveTaskExcute = (object)=>{
        Promise.all(object.Task).then((article_items)=>{
            object.article_items = article_items;

            return new Promise((resolve,reject)=>{
                let pathArray =[];
                if(photos){
                    for(let index = 0; index<photos.length; index++){
                        pathArray.push(photos[index].path);
                    }
                }
                const article = new Article({
                    Kml_Uri:kml.path,
                    Contents:Contents,
                    Images:pathArray,
                    Publish_range:Publish_range,
                    Article_List:object.article_items,
                    PostedBy:object.user._id
                });
                article.save().then((savedArticle)=>{
                    res.json(savedArticle);
                    resolve();
                }).catch(()=>{
                    const error = new Error('Article Save Fail');
                    error.status = 500;
                    reject(error);
                })
            });
        }).catch((errors)=>{
            return new Promise((resolve,reject)=>{
                const error = new Error(errors);
                error.status = 500;
                reject(error);
            });
        })
    }
    const onError = (error)=>{
        next(error,req,res,next);
    };

    User.findOne({Nick:Nick,App:App,AppId:AppId})
        .populate({path:'Friends',select:'_id Nick App'})
        .exec()
        .then(find)
        .then(createArticleItemSaveTask)
        .then(ArticleItemSaveTaskExcute)
        .catch(onError);
};
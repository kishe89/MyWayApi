
module.exports = function ArticleItemSavePromise(Article,user){
    return new Promise((resolve,reject)=>{
        const ArticleItem = require('../../../../model/ArticleItem');
        const articleItem = new ArticleItem({
            Title: Article.Title,
            Place: Article.Place,
            PlaceType: Article.PlaceType,
            Loc:Article.Loc,
            PostedBy:user._id
        });
        articleItem.save()
            .then((article)=>{
                resolve([article._id]);
            })
            .catch((err)=>{
                reject([err]);
            });
    });
}

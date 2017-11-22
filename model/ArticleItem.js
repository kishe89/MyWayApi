/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticleItemSchema = new Schema({
    Title:String,
    Place:String,
    PlaceType:String,
    Loc : {
        type: [Number],
        index:'2d'
    },
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, defult: Date.now },
    UpdatedAt: { type:Date, defult: Date.now }

});

module.exports = mongoose.model('article_item', ArticleItemSchema);
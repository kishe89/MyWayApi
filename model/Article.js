/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    Kml_Uri:String,
    Contents:String,
    Like:{ type:Number, min: 0, default: 0},
    Like_Persons:[{type: Schema.Types.ObjectId, ref: 'user'}],
    Images:[{type:String}],
    Publish_range:{type: Number, default:0},
    Article_List:[{ type: Schema.Types.ObjectId, ref: 'article_item'}],
    Comments:[{ type: Schema.Types.ObjectId, ref: 'comment'}],
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, default: Date.now },
    UpdatedAt: { type:Date, default: Date.now }

});
ArticleSchema.index({UpdatedAt:-1,CreatedAt:-1});
module.exports = mongoose.model('article', ArticleSchema);
/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    Kml_Uri:String,
    Like:{ type:Number, min: 0, default: 0},
    Like_Persons:{type: Schema.Types.ObjectId, ref: 'user'},
    Publish_range:{type: Number, default:0},
    Article_List:[{ type: Schema.Types.ObjectId, ref: 'article_item'}],
    Comments:[{ type: Schema.Types.ObjectId, ref: 'comment'}],
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, defult: Date.now },
    UpdatedAt: { type:Date, defult: Date.now }

});

module.exports = mongoose.model('article', ArticleSchema);
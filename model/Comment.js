/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    Contents:String,
    Like:{ type:Number, min: 0, default: 0},
    Like_Persons:{type: Schema.Types.ObjectId, ref: 'user'},
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, defult: Date.now },
    UpdatedAt: { type:Date, defult: Date.now }

});

module.exports = mongoose.model('comment', CommentSchema);
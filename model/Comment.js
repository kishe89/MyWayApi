/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    Contents:String,
    Like:{ type:Number, min: 0, default: 0},
    Like_Persons:{type: Schema.Types.ObjectId, ref: 'user'},
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, default: Date.now },
    UpdatedAt: { type:Date, default: Date.now }

});

module.exports = mongoose.model('comment', CommentSchema);
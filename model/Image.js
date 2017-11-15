/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    Name:String,
    Size:Number,
    Uri:String,
    PostedBy:{ type: Schema.Types.ObjectId, ref: 'user'},
    CreatedAt: { type:Date, defult: Date.now }

});

module.exports = mongoose.model('image', ImageSchema);
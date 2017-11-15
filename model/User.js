/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Nick: {type:String,unique:true},
    App:String,
    AppId:String,
    AccessToken:String,
    Profile: String,
    Friends:[{ type: Schema.Types.ObjectId, ref: 'user'}],
    Agree_Wait_Friends:[{ type: Schema.Types.ObjectId, ref: 'user'}],
    Upload_Article:[{ type: Schema.Types.ObjectId, ref: 'article'}],
    CreatedAt: { type:Date, defult: Date.now }

});

module.exports = mongoose.model('user', UserSchema);
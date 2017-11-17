/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    Nick:String,
    App:String,
    AppId:String,
    AccessToken:String,
    DecryptValue:String,
    Profile: String,
    Friends:[{ type: Schema.Types.ObjectId, ref: 'user'}],
    Agree_Wait_Friends:[{ type: Schema.Types.ObjectId, ref: 'user'}],
    Upload_Article:[{ type: Schema.Types.ObjectId, ref: 'article'}],
    CreatedAt: { type:Date, defult: Date.now }
});
UserSchema.index({ App: 1, AppId: 1 }, { unique: true });
module.exports = mongoose.model('user', UserSchema);
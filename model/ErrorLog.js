/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ErrorLogSchema = new Schema({
    userAgent: String,
    ip: String,
    originalUrl: String,
    protocol: String,
    date: String,
    method: String,
    ApplicationId: String,
    resStatusCode:String,
    resLocals:String
});

module.exports = mongoose.model('error_log', ErrorLogSchema);
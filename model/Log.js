/**
 * http://usejsdoc.org/
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LogSchema = new Schema({
    userAgent: String,
    ip: String,
    originalUrl: String,
    protocol: String,
    date: String,
    method: String,
    ApplicationId: String

});

module.exports = mongoose.model('log', LogSchema);
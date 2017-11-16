/**
 * Created by kjw on 2017. 6. 23..
 * This module is intended to collect logs and create log objects.
 * The generator returns a log object.
 * You can pass log objects to the desired logging server through the API call method.
 */
'use strict'


/**
 * Module exports.
 * @public
 */

module.exports = generator;
/**
 * Module dependency.
 * @private
 */
let cfenv = require('cfenv');
let dateFormat = require('dateformat');
const timeFormatMask = "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'";

function generator(req) {

    const headers = req.headers;
    const userAgent = headers['user-agent'];
    const ip = headers['x-forwarded-for'];
    const protocol = headers['x-forwarded-proto'];
    const date = dateFormat(Date.now(),timeFormatMask);
    const method = req.method;
    const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let ApplicationId;
    if(process.env.VCAP_SERVICES){
        ApplicationId = cfenv.getAppEnv().name;
    }else{
        ApplicationId = 'LocalHost Dev';
    }

    return {
        userAgent: userAgent,
        ip: ip,
        originalUrl: originalUrl,
        protocol: protocol,
        date: date,
        method: method,
        ApplicationId: ApplicationId
    };
}
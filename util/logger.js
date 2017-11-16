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

exports.reqgenerator = reqgenerator;
exports.resgenerator = resgenerator;
/**
 * Module dependency.
 * @private
 */
let cfenv = require('cfenv');
let dateFormat = require('dateformat');
const timeFormatMask = "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'";

function reqgenerator(req) {

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
function resgenerator(req,res) {

    const headers = req.headers;
    const userAgent = headers['user-agent'];
    const ip = headers['x-forwarded-for'];
    const protocol = headers['x-forwarded-proto'];
    const date = dateFormat(Date.now(),timeFormatMask);
    const method = req.method;
    const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let ApplicationId;
    const locals = JSON.stringify(res.locals);
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
        ApplicationId: ApplicationId,
        resStatusCode:res.statusCode,
        resLocals:locals
    };
}
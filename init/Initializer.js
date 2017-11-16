/**
 * CreatedAt 2017-11-16 14:07:00 kst
 * by kim ji woon
 *
 */

exports.InitMongoDB = function (env,mongoose) {

    if(!env.VCAP_SERVICES){
        /**
         * @TODO Local Initialization
         * Please Input ./credentials/credential.js
         */
        let credentials = require('../credentials/credential');
        const options = {
            useMongoClient:true,
            connectTimeoutMS: 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        let db = mongoose.connect(credentials.MongodbURI,options);
        db.on('error',function (err) {
            console.error(err);
        });
        db.on('connected',function () {
            console.log('connection is connected');
        });
        db.on('disconnected',function (err) {
            console.error(err);
        });
    }else{
        /**
         * @TODO Production Environment Initialization
         */
        let service = JSON.parse(env.VCAP_SERVICES);
        let mongodb = service['compose-for-mongodb'];
        let connection_string = mongodb[0].credentials.uri;
        const options = {
            useMongoClient: true,
            connectTimeoutMS: 4000,
            keepAlive: true,
            ssl: true,
            sslValidate: true,
            sslCA: ca,
            ha: true,
            reconnectTries: 30
        }

    }
};
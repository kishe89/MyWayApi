/**
 * CreatedAt 2017-11-16 14:07:00 kst
 * by kim ji woon
 *
 */

exports.InitMongoDB = function (env) {
    if(!env.VCAP_SERVICES){
        /**
         * TODO Local Initialization
         */

    }else{
        /**
         * TODO Production Environment Initialization
         */
        let service = JSON.parse(env.VCAP_SERVICES);
        let mongodb = service['compose-for-mongodb'];
        let connection_string = mongodb[0].credentials.uri;
        const options = {server: { socketOptions: { connectTimeoutMS: 4000 }},mongos:true};

    }
};
/**
 * Created by kjw on 2017. 9. 24..
 */

module.exports = function AsyncUploadObjectStorage(part,fileName,req) {
    return new Promise(function(resolve, reject) {
        var container = 'profile';
        var objectstorage_writeStream = req.storageClient.upload({
            container: container,
            remote: fileName
        });
        part.pipe(objectstorage_writeStream);
        objectstorage_writeStream.on('success', function(file) {
            // success, file will be a File model
            return resolve([file.name,Date.now()]);
        });
        objectstorage_writeStream.on('error', function(file) {
            // Fail, error handle
            return reject([file.name,Date.now()]);
        });
    });
};
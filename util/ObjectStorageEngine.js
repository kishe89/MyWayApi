function ObjectStorage (opts) {
    this.getDestination = (opts.destination)
}

ObjectStorage.prototype._handleFile = function _handleFile (req, file, cb) {
    this.getDestination(req, file, function (err, container) {
        if (err) {
            return cb(err)
        }
        const filePath = container+'_'+Date.now()+'_'+file.originalname;
        let outStream = req.storageClient.upload({
            container:container,
            remote:filePath
        });
        file.stream.pipe(outStream);
        outStream.on('error', cb)
        outStream.on('success', function (savedFile) {
            cb(null, {
                container: container,
                path: savedFile.name,
                size: savedFile.size,
                date:Date.now()
            })
        })
    })
}
ObjectStorage.prototype._removeFile = function _removeFile (req, file, cb) {
    req.storageClient.removeFile({
        container:file.container,
        remote:file.originalname
    },()=>{
        cb(null, {
            container: container,
            path: file.originalname,
            date:Date.now()
        })
    })
}
module.exports = function (opts) {
    return new ObjectStorage(opts)
}
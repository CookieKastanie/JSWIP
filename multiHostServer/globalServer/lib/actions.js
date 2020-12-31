const fileManager = require('./fileManager');

module.exports = {
    valid() {
        return {
            valid: true
        };
    },

    address(req) {
        return {
            address: req.connection.remoteAddress
        };
    },

    async listing(req, data) {
        return {
            files: await fileManager.listing(data.folder)
        };
    },

    async exist(req, data) {
        const {name} = data;
        return {exist: await fileManager.exist(name)};
    },

    /*upload(req, tmp) {
        const name = req.headers['resource-name'];
        if(name) {
            return fileManager.save(name, tmp).then(() => {return {valid: true}}).catch(e => {
                console.log(e);
                return {valid: false}
            })
        } else {
            return {valid: false};
        }
    },*/

    download(req, data) {
        const {name} = data;
        return fileManager.read(name);
    }
}

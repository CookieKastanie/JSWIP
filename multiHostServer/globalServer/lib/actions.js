module.exports = {
    address(req) {
        return {
            address: req.connection.remoteAddress
        };
    }
}

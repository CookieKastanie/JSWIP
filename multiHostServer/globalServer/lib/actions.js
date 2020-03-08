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
    }
}

const http = require('./http');

module.exports = {
    getAddress() {
        return http.get('address').then(data => data.address);
    }
}

const http = require('./http');

module.exports = {
    isValid() {
        return http.get('valid').then(data => data.valid);
    },

    getAddress() {
        return http.get('address').then(data => data.address);
    }
}

const http = require('./http');

module.exports = {
    isValid() {
        return http.get('valid').then(data => data.valid);
    },

    getAddress() {
        return http.get('address').then(data => data.address);
    },

    exist(name) {
        return http.post('exist', {name}).then(data => data.exist == true);
    },

    send(name) {
        return http.sendFile(`./${name}.zip`, name);
    },

    pull(name) {
        return http.recieveFile(name);
    }
}

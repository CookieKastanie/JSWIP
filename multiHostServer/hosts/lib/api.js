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

    send(name, progress) {
        return http.sendFile(`./${name}.zip`, name, progress);
    },

    pull(name, progress) {
        return http.recieveFile(name, progress);
    }
}

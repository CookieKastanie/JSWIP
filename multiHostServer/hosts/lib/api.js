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

    send(name, localName, progress) {
        return http.sendFile(`./${localName}.zip`, name, progress);
    },

    pull(name, localName, progress) {
        return http.recieveFile(name, localName, progress);
    }
}

import config from '../config.json';

export class Flex {
    constructor() {
        this.host = `${window.location.protocol}//${window.location.hostname}:${config.api_port}`;
    }

    async getFilesList() {
        return fetch(`${this.host}/files`, {method: 'GET'}).then(res => {
            return res.json();
        });
    }

    async send(name, password, date, files, progressEvent = () => {}) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('date', date);

        for(const f of files) formData.append('files', f);

        return new Promise((resolve, reject) => {
            const ajax = new XMLHttpRequest();
            ajax.upload.addEventListener('progress', progressEvent, false);
            ajax.addEventListener('load', resolve, false);
            ajax.addEventListener('error', reject, false);
            ajax.addEventListener('abort', reject, false);
            ajax.open('POST', `${this.host}/send`);
            ajax.send(formData);
        })
        
    }

    async get(name, password) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);

        return fetch(`${this.host}/get`, {
            method: 'POST',
            body: formData
        }).then(res => {
            return res.arrayBuffer();
        });
    }

    linkFrom(name, password) {
        return `${this.host}/get/${name}/${password}`;
    }

    async delete(name, password) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);

        return fetch(`${this.host}/delete`, {
            method: 'POST',
            body: formData
        }).then(res => {
            return res;
        });
    }
}

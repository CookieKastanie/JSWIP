export class Task { 
    static init() {
        Task.worker = new Worker('worker.js');

        Task.worker.onmessage = e => {
            const d = e.data;
            Task.queue.get(d.id)({result: d.result, seconds: d.seconds});
            Task.queue.delete(d.id);
        };
    }

    static submit(params) {
        return new Promise((resolve) => {
            const id = Task.idMax++; 
            Task.queue.set(id, resolve);
            params.id = id;
            Task.worker.postMessage(params);
        });
    }
}

Task.worker = null;
Task.queue = new Map();
Task.idMax = 0;

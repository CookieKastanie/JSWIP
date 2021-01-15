import { RNG } from "./RNG";

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
            let func = params.func.toString();

            func = `${RNG.toString()}\n(function ${func})(${params.args.join(',')})`;
            func = func.replace(/_RNG__WEBPACK_IMPORTED_MODULE_1__\["RNG"\]/g, `RNG`);

            const id = Task.idMax++; 
            Task.queue.set(id, resolve);

            Task.worker.postMessage({
                id,
                func,
            });
        });
    }
}

Task.worker = null;
Task.queue = new Map();
Task.idMax = 0;

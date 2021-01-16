export class Timer {
    constructor() {
        this.t0 = 0;
        this.t1 = 0;
        this.delta = 0;
    }

    start() {
        this.t0 = performance.now();
    }

    stop() {
        this.t1 = performance.now();
        this.delta = Math.floor((this.t1 - this.t0)) * 0.001;

        return this.delta;
    }

    getDelta() {
        return this.delta;
    }
}

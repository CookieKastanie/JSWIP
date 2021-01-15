import { PI } from "./PI";
import { EXP } from "./EXP";

const classes = {
    PI,
    EXP
}

self.onmessage = e => {
    const d = e.data;

    const t0 = performance.now();
    const result =  classes[d.class][d.func].call(d.args); 
    const t1 = performance.now();

    self.postMessage({
        id: d.id,
        result,
        seconds: (t1 - t0) * 0.001
    });
};

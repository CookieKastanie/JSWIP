import { PI } from "../PI";
import { EXP } from "../EXP";
import { Timer } from "./Timer";

const classes = {
    PI,
    EXP
}

self.onmessage = e => {
    const d = e.data;

    const timer = new Timer();

    timer.start();
    const result = classes[d.class][d.func].call(d.args); 
    timer.stop();

    self.postMessage({
        id: d.id,
        result,
        seconds: timer.getDelta()
    });
};

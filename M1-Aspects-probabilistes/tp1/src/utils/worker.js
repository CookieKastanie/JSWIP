import { PI } from "../PI";
import { E } from "../E";
import { Timer } from "./Timer";

const classes = {
    PI,
    E
}

self.onmessage = e => {
    const d = e.data;

    const timer = new Timer();

    timer.start();
    const result = classes[d.class][d.func](...d.args); 
    timer.stop();

    self.postMessage({
        id: d.id,
        result,
        seconds: Number(timer.getDelta()).toFixed(3)
    });
};

import './css/importCSS';

import { Eagle } from 'akila/utils';
import { Time } from 'Akila/time';
import { Process } from './process/Process';
import { Exemples } from './exemples/Exemples';
import { Editor } from './editor/Editor';

console.log(Eagle.getString());

const time = new Time();
time.onInit(Process.init);
time.onTick(Process.update);
time.onDraw(Process.draw);
time.start();

window.cmd = {
    loadCircle: () => {
        Editor.setValue(Exemples.circle());
    },
    loadMandelbrot: () => {
        Editor.setValue(Exemples.mandelbrot());
    },
    loadConvolution: () => {
        Editor.setValue(Exemples.convolution());
    },
    loadRayMarching: () => {
        Editor.setValue(Exemples.rayMarching());
    },
    hardReset: () => {
        window.addEventListener('beforeunload', e => {
            e.stopPropagation();
            localStorage.clear();
        }, true);
        location.reload();
    }
}

document.addEventListener('visibilitychange', () => {
    if(document.visibilityState != 'visible') time.pause();
    else time.play();
});

window.addEventListener('error', () => {
    Process.saveToLocalStorage();
});

window.addEventListener('beforeunload', () => {
    Process.saveToLocalStorage();
});

setTimeout(() => {
    document.querySelector('body').removeChild(document.getElementById('loading'));
}, 10);

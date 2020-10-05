import './css/importCSS';

import { Eagle } from 'akila/utils';
import { Time } from 'Akila/time';
import { Process } from './process/Process';

console.log(Eagle.getString());

const time = new Time();
time.onInit(Process.init);
time.onTick(Process.update);
time.onDraw(Process.draw);
time.start();

document.addEventListener('visibilitychange', () => {
    if(document.visibilityState != 'visible') time.pause();
    else time.play();
});

setTimeout(() => {
    document.querySelector('body').removeChild(document.getElementById('loading'));
}, 10);

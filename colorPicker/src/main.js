import { Time } from 'Akila/time';

import { HSVVisualSelector } from './HSVVisualSelector';

const time = new Time();
const hsv = new HSVVisualSelector({container: '#gradContainer', canvas: '#grad', pointer: '#pointer', hue: '#hue', saturation: '#saturation', value: '#value'});

time.onInit(async () => {
    
});

time.onDraw(() => {
    //console.log(hsv.getHue(), hsv.getSaturation(), hsv.getValue());
    hsv.draw();
});

time.start();

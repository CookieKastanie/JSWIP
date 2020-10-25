const clamp = (a, b, v) => {
    return Math.min(b, Math.max(a, v));
}

export class HSVVisualSelector {
    constructor(selectors = {container: null, pointer: null, canvas: null, hue: null, saturation: null, value: null}) {
        this.hue = 0;
        this.saturation = 0;
        this.value = 0;

        this.container = document.querySelector(selectors.container);
        this.container.style = 'position: relative; width: fit-content; height: fit-content; display: block;';

        this.canvas = document.querySelector(selectors.canvas);
        this.canvas.setAttribute('id', 'grad');
        this.ctx = this.canvas.getContext('2d');
        let W = 512;
        let H = 512;

        this.canvas.width = W;
        this.canvas.height = H;


        this.hueSelector = document.querySelector(selectors.hue);
        this.hueSelector.setAttribute('min', 0);
        this.hueSelector.setAttribute('max', 360);
        this.hueSelector.setAttribute('step', 0.01);
 
        const hueEvent = () => {
            this.hue = clamp(0, 360, this.hueSelector.value);
        }
        this.hueSelector.onchange = hueEvent;
        this.hueSelector.onmousemove = hueEvent;



        this.pointer = document.querySelector(selectors.pointer);
        this.pointer.style.position = 'absolute';
        this.setX(0);
        this.setY(0);
        


        this.saturationSelector = document.querySelector(selectors.saturation);
        this.saturationSelector.setAttribute('min', 0);
        this.saturationSelector.setAttribute('max', 1);
        this.saturationSelector.setAttribute('step', 0.00001);
        
        const satEvent = () => {
            this.saturation = clamp(0, 1, this.saturationSelector.value);
        }
        this.saturationSelector.onchange = satEvent;
        this.saturationSelector.onmousemove = satEvent;
        

        this.valueSelector = document.querySelector(selectors.value);
        this.valueSelector.setAttribute('type', 'range');
        this.valueSelector.setAttribute('min', 0);
        this.valueSelector.setAttribute('max', 1);
        this.valueSelector.setAttribute('step', 0.00001);

        const valEvent = () => {
            this.value = clamp(0, 1, this.valueSelector.value);
        }
        this.valueSelector.onchange = valEvent;
        this.valueSelector.onmousemove = valEvent;
    



        this.saturationGrad = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        this.saturationGrad.addColorStop(0, 'white');
        this.saturationGrad.addColorStop(1, 'red');

        this.valueGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        this.valueGrad.addColorStop(0, '#00000000');
        this.valueGrad.addColorStop(1, '#000000ff');
    }

    setX(x) {
        this.pointer.style.left = clamp(0, this.canvas.width, x)+ 'px';
    }

    setY(y) {
        this.pointer.style.top = clamp(0, this.canvas.height, y)+ 'px';
    }

    getHue() {
        return this.hue;
    }

    getSaturation() {
        return this.saturation;
    }

    getValue() {
        return this.value;
    }

    draw() {
        this.setX(this.saturation * this.canvas.width);
        this.setY(this.canvas.height - this.value * this.canvas.height);

        this.ctx.fillStyle = this.saturationGrad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = this.valueGrad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

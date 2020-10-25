import { Texture } from 'Akila/webgl';
import { Clock } from 'Akila/time';

export class Sprite {
    constructor(texture, nbframe = 1) {
        this.texture = texture;
        this.clock = new Clock(0, nbframe, 5);
        this.offSet = this.texture.getWidth() / nbframe;
        this.nbframe = nbframe;
    }

    getNbFrame() {
        return this.nbframe;
    }

    next() {
        this.clock.next();
    }

    reset() {
        this.clock.reset();
    }

    prepare() {
        this.texture.use();
        return this.clock.getValue() * this.offSet;
    }
}

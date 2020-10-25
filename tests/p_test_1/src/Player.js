import { Shader, VAO, VBO } from 'Akila/webgl';
import { Time } from 'Akila/time';
import { Keyboard, Gesture } from 'Akila/inputs';
import { Matrix4 } from 'Akila/utils'

export class PlayerRenderer {
    constructor(vs, fs, pw = 19, ph = 29) {
        this.shader = new Shader(vs, fs, 'Player');

        this.shape = new VAO()
        .addVBO(new VBO([
            0, 0,     pw, ph,     0, ph,
            0, 0,     pw, 0,      pw, ph
        ], 2, this.shader.getAttribLocation('vertex')));

        this.matrix = Matrix4.identity();
    }

    prepare(cam) {
        this.shader.use();
        this.shader.sendMat4('camera', cam);
    }

    render(player) {
        const sprite = player.getSprite();
        const offSet = sprite.prepare();

        this.matrix[12] = player.x;
        this.matrix[13] = player.y;

        this.shader.sendFloat('spriteOffset', offSet);
        this.shader.sendFloat('nbFrame', sprite.getNbFrame());
        this.shader.sendMat4('position', this.matrix);

        this.shape.draw();
    }
}


export class Player {
    constructor(x, y, sprites) {
        this.x = x;
        this.y = y;

        this.sprites = sprites
        this.currentSprite = 1;

        this.speed = 45;

        this.keyboard = new Keyboard();
        this.gesture = new Gesture();

        this.hitBox = {
            x0: -14 / 2,
            y0: 29/4,
            x1: 14 / 2,
            y1: 0
        }
    }

    getHitBox() {
        return {
            x0: this.hitBox.x0 + this.x,
            y0: this.hitBox.y0 + this.y,
            x1: this.hitBox.x1 + this.x,
            y1: this.hitBox.y1 + this.y,
        }
    }

    getSprite() {
        return this.sprites[this.currentSprite];
    }

    update() {

        const screenHalf = 350;
        const screenQuarter = 175;



        const dSpeed = this.speed * Time.delta;

        let m = false;


        if(this.keyboard.isPressed(Keyboard.KEY_Q) || (this.gesture.isTouch() && this.gesture.touchX() < (screenHalf - screenQuarter))) {
            this.x -= dSpeed;
            this.currentSprite = 2;
            m = true;
        }
        if(this.keyboard.isPressed(Keyboard.KEY_D) || (this.gesture.isTouch() && this.gesture.touchX() > (screenHalf + screenQuarter))) {
            this.x += dSpeed;
            this.currentSprite = 3;
            m = true;
        }
        if(this.keyboard.isPressed(Keyboard.KEY_Z) || (this.gesture.isTouch() && this.gesture.touchY() < (screenHalf - screenQuarter))) {
            this.y += dSpeed;
            this.currentSprite = 0;
            m = true;
        }
        if(this.keyboard.isPressed(Keyboard.KEY_S) || (this.gesture.isTouch() && this.gesture.touchY() > (screenHalf + screenQuarter))) {
            this.y -= dSpeed;
            this.currentSprite = 1;
            m = true;
        }
        

        if(m) {
            this.getSprite().next();
        } else {
            this.getSprite().reset();
        }
    }
}

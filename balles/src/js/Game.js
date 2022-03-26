import { Sphere } from "./Sphere";
import { Vec2 } from "./Vec2";

export class Game {
    constructor() {
        this.clear();
        this.useGravity(true);
    }

    update(w, h) {
        for(let i = 0; i < this.spheres.length; ++i) {
            const s1 = this.spheres[i];

            s1.update(this.gravity);
            s1.constrain(w, h);

            for(let j = i + 1; j < this.spheres.length; ++j) {    
                const s2 = this.spheres[j];
                s1.collide(s2);
            }
        }
    }

    draw(ctx) {
        for(const s of this.spheres) {
            s.draw(ctx);
        }
    }

    addRandom(position, velocity = new Vec2()) {
        const s = new Sphere((Math.random() * 40 | 0) + 30, position.clone());
        s.vel.linear = velocity.clone();

        const r = Math.random() * 255 | 0;
        const g = Math.random() * 255 | 0;
        const b = Math.random() * 255 | 0;

        s.color = `rgba(${r}, ${g}, ${b}, 1)`;
        this.spheres.push(s);
    }

    clear() {
        this.spheres = [];
    }

    useGravity(use) {
        if(use) this.gravity = 1;
        else this.gravity = 0;
    }
}

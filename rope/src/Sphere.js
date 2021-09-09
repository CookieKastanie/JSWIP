import { Vector } from './Rope'

export class Sphere {
    constructor(radius = 1) {
        this.radius = radius;
        this.position = new Vector();
    }

    pointCollide(vec) {
        if(Vector.dist(this.position, vec) < this.radius) {
            return this.position.add(vec.sub(this.position).normalize().scalarMult(this.radius));
        } else {
            return vec;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 180, false);
        ctx.stroke();
    }
}

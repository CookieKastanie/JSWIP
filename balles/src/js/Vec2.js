export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    }

    dot(vec) {
        return this.x * vec.x + this.y * vec.y;
    }

    dist2(vec) {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;

        return dx * dx + dy * dy;
    }

    dist(vec) {
        return Math.sqrt(this.dist2(vec));
    }

    mult(vec) {
        this.x *= vec.x;
        this.y *= vec.y;

        return this;
    }

    multScalar(s) {
        this.x *= s;
        this.y *= s;

        return this;
    }

    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const l = this.norm();

        if(l > 0) {
            this.x /= l;
            this.y /= l;
        }

        return this;
    }

    reflect(vec) {
        const n = vec.clone().normalize();
        const s = 2 * this.dot(n);
        n.multScalar(s);
        this.sub(n);

        return this;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    equal(vec) {
        return (this.x === vec.x) && (this.y === vec.y);
    }
}

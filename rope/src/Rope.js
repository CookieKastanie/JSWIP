export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    sub(vec) {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    scalarMult(n) {
        return new Vector2(this.x * n, this.y * n);
    }

    normalize() {
        const length = Math.hypot(this.x, this.y);
        if(length === 0) return new Vector2();
        else return new Vector2(this.x / length, this.y / length);
    }

    static dist(v1, v2) {
        return Math.hypot(v1.x - v2.x, v1.y - v2.y);
    }
}

export class Point {
    constructor(x = 0, y = 0) {
        this.position = new Vector2(x, y);
        this.prevPosition = new Vector2(x, y);
        this.isLocked = false;
    }
}

export class Stick {
    constructor(pa = new Point(), pb = new Point()) {
        this.pointA = pa;
        this.pointB = pb;
        this.length = Vector2.dist(this.pointA.position, this.pointB.position);
        this.halfLength = this.length / 2;
    }
}

export class Rope {
    constructor() {
        this.points = [];
        this.sticks = [];
    }

    update(delta) {
        for(const p of this.points) {
            if(!p.isLocked) {
                // conservation du mouvement
                const lastPos = p.position;
                p.position = p.position.add(p.position.sub(p.prevPosition));
                p.prevPosition = lastPos;

                // ajout des forces externes
                const gravity = 900;
                p.position.y += gravity * delta * delta;
            }
        }

        // contraintes
        for(let i = 0; i < Rope.CONSTRAINS_ITERATION_COUNT; ++i) {
            for(const stick of this.sticks) {
                const stickCenter = stick.pointA.position.scalarMult(0.5).add(stick.pointB.position.scalarMult(0.5));
                const stickDir = stick.pointA.position.sub(stick.pointB.position).normalize().scalarMult(stick.halfLength);

                if(!stick.pointA.isLocked) stick.pointA.position = stickCenter.add(stickDir);
                if(!stick.pointB.isLocked) stick.pointB.position = stickCenter.sub(stickDir);
            }
        }
    }

    draw(ctx) {
        for(const stick of this.sticks) {
            ctx.beginPath();
            ctx.moveTo(stick.pointA.position.x, stick.pointA.position.y);
            ctx.lineTo(stick.pointB.position.x, stick.pointB.position.y);
            ctx.stroke();
        }
    }
}

Rope.CONSTRAINS_ITERATION_COUNT = 50;

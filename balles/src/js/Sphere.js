import { Vec2 } from "./Vec2";

export class Sphere {
    constructor(radius = 1, pos = new Vec2()) {
        this.radius = radius;
        this.radius2 = radius * radius;
        this.position = pos;
        this.rotation = 0;

        this.mass = this.radius;
        this.bounce = .8;
        this.friction = .99;

        this.color = '#d11';

        this.vel = {
            linear: new Vec2(),
            angular: 0
        }
    }

    moment(vec) {
        let aMur = Math.atan(-vec.y / vec.x);
        let aForce = Math.atan(-this.vel.linear.y / this.vel.linear.x);

        if(vec.x < 0) aMur += Math.PI;
        if(this.vel.linear.x < 0) aForce += Math.PI;

        const newA = Math.sin(aForce - aMur - Math.PI) * this.vel.linear.dist(vec) / this.radius;

        if(!isNaN(newA))
            this.vel.angular = this.vel.angular * 0.2 + newA * 0.8;
    }

    collide(other) {
        const s1 = this;
        const s2 = other;

        if(s1.position.equal(s2.position)) {
            s2.position.x += Math.random() * 2 - 1;
            s2.position.y += Math.random() * 2 - 1;
        }

        const dist = s1.position.dist2(s2.position);
        const radSum = s1.radius + s2.radius;

        if(dist >= radSum * radSum) return;

        s1.moment(s2.vel.linear.clone().multScalar(-1));
        s2.moment(s1.vel.linear.clone().multScalar(-1));

        const overlap = (radSum - Math.sqrt(dist)) * .5;


        const dx = s1.position.x - s2.position.x;
        const dy = s1.position.y - s2.position.y;
        let angle = Math.atan(dy / dx);
        if(dx < 0) {
            angle += Math.PI;
        }
        s1.position.x += overlap * Math.cos(angle);
        s1.position.y += overlap * Math.sin(angle);

        s2.position.x += overlap * -Math.cos(angle);
        s2.position.y += overlap * -Math.sin(angle);

        const n1 = s2.vel.linear.norm() * .7;
        const n2 = s1.vel.linear.norm() * .7;

        s1.vel.linear.x += n1 * Math.cos(angle);
        s1.vel.linear.y += n1 * Math.sin(angle);

        s2.vel.linear.x += n2 * -Math.cos(angle);
        s2.vel.linear.y += n2 * -Math.sin(angle);


        s1.vel.linear.multScalar(s1.bounce);
        s2.vel.linear.multScalar(s2.bounce);
    }

    update(g) {
        this.vel.linear.y += g;

        this.position.add(this.vel.linear);
        this.rotation += this.vel.angular;
    }

    constrain(w, h) {
        if(this.position.x - this.radius <= 0) {
            this.moment(new Vec2(1, 0));
            this.vel.linear.x *= -this.bounce;
            this.vel.linear.y *= this.friction;

            this.position.x = this.radius;
        } else if(this.position.x + this.radius >= w) {
            this.moment(new Vec2(-1, 0));
            this.vel.linear.x *= -this.bounce;
            this.vel.linear.y *= this.friction;

            this.position.x = w - this.radius;
        }

        if(this.position.y - this.radius <= 0) {
            this.moment(new Vec2(0, 1));
            this.vel.linear.y *= -this.bounce;
            this.vel.linear.x *= this.friction;

            this.position.y = this.radius;
        } else if(this.position.y + this.radius >= h) {
            this.moment(new Vec2(0, -1));
            this.vel.linear.y *= -this.bounce;
            this.vel.linear.x *= this.friction;

            this.position.y = h - this.radius;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(2 * this.radius / 4, 2 * this.radius / 4, this.radius / 4, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
    }
}

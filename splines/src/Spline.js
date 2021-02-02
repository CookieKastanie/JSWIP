import { Point } from "./Point";

export class Spline {
    constructor(points) {
        this.points = points;
        this.loop = false;
    }

    setLoop(loop) {
        this.loop = loop;
    }

    isLooping() {
        return this.loop;
    }

    getLength() {
        if(this.loop) return this.points.length;
        else return this.points.length - 3;
    }

    getPoint(t) {
        let p0, p1, p2, p3;

		if(!this.loop) {
			p1 = Math.floor(t + 1);
			p2 = p1 + 1;
			p3 = p2 + 1;
			p0 = p1 - 1;
        } else {
			p1 = Math.floor(t);
			p2 = (p1 + 1) % this.points.length;
			p3 = (p2 + 1) % this.points.length;
			p0 = p1 >= 1 ? p1 - 1 : this.points.length - 1;
		}

		t = t - Math.floor(t);

		const tt = t * t;
		const ttt = tt * t;

		const w0 = -ttt + 2 * tt - t;
		const w1 = 3 * ttt - 5 * tt + 2;
		const w2 = -3 * ttt + 4 * tt + t;
		const w3 = ttt - tt;

		const x = 0.5 * (this.points[p0].x * w0 + this.points[p1].x * w1 + this.points[p2].x * w2 + this.points[p3].x * w3);
		const y = 0.5 * (this.points[p0].y * w0 + this.points[p1].y * w1 + this.points[p2].y * w2 + this.points[p3].y * w3);

		return new Point(x, y);
    }

    getGrandiant(t) {
        let p0, p1, p2, p3;

        if(!this.loop) {
			p1 = Math.floor(t + 1);
			p2 = p1 + 1;
			p3 = p2 + 1;
			p0 = p1 - 1;
        } else {
			p1 = Math.floor(t);
			p2 = (p1 + 1) % this.points.length;
			p3 = (p2 + 1) % this.points.length;
			p0 = p1 >= 1 ? p1 - 1 : this.points.length - 1;
		}

		t = t - Math.floor(t);

		const tt = t * t;

		const w0 = -3 * tt + 4 * t - 1;
		const w1 = 9 * tt - 10 * t;
		const w2 = -9 * tt + 8 * t + 1;
		const w3 = 3 * tt - 2 * t;

		const x = 0.5 * (this.points[p0].x * w0 + this.points[p1].x * w1 + this.points[p2].x * w2 + this.points[p3].x * w3);
		const y = 0.5 * (this.points[p0].y * w0 + this.points[p1].y * w1 + this.points[p2].y * w2 + this.points[p3].y * w3);

		return new Point(x, y);
    }

    getAngle(t) {
        const p = this.getGrandiant(t);
        return Math.atan2(-p.y, p.x);
    }
}

import { RNG } from "./RNG";
import { Doc } from "./Doc";

export class Polygone {
    constructor(vCount = 8, l = 1) {
        this.vertices = new Array();

        this.xMin = Infinity;
        this.yMin = Infinity;
        this.xMax = -Infinity;
        this.yMax = -Infinity;

        for(let i = 0; i < vCount; ++i) {
            const angle = (i / vCount) * (Math.PI * 2);
            const r = RNG.range(0, l);
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r
            this.vertices.push([x, y]);

            if(this.xMin > x) this.xMin = x;
            if(this.xMax < x) this.xMax = x;
            if(this.yMin > y) this.yMin = y;
            if(this.yMax < y) this.yMax = y;
        }
    }

    isInside(x, y) {
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

        let inside = false;
        for(let i = 0, j = this.vertices.length - 1; i < this.vertices.length; j = i++) {
            const xi = this.vertices[i][0];
            const yi = this.vertices[i][1];
            const xj = this.vertices[j][0];
            const yj = this.vertices[j][1];
            
            if(((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
        }
        
        return inside;
    }

    approxArea(n = 1e6) {
        let count = 0;

        for(let i = 0; i < n; ++i) {
            let x = RNG.range(this.xMin, this.xMax);
            let y = RNG.range(this.yMin, this.yMax);

            if(this.isInside(x, y)) ++count;
        }

        const boundingBoxArea = (this.xMax - this.xMin) * (this.yMax - this.yMin);

        return boundingBoxArea * (count / n);
    }

    exactArea() {
        const vertCount = this.vertices.length;
        let sum1 = 0
        let sum2 = 0
        
        for(let i = 0; i < vertCount - 1; ++i) {
            sum1 += this.vertices[i][0] * this.vertices[i + 1][1];
            sum2 += this.vertices[i][1] * this.vertices[i + 1][0];
        }
        
        sum1 += this.vertices[vertCount - 1][0] * this.vertices[0][1];
        sum2 += this.vertices[0][0] * this.vertices[vertCount - 1][1];
        
        return Math.abs(sum1 - sum2) / 2;
    }
  

    ////////////////////////////////////////////////////////


    draw(ctx) {
        ctx.strokeStyle = '#AAA';

        ctx.beginPath();

        let first = true;
        for(const c of this.vertices) {
            if(first) {
                first = false;
                ctx.moveTo(c[0], c[1]);
            }

            ctx.lineTo(c[0], c[1]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    drawMonteCarlo(ctx) {
        for(let i = 0; i < 10000; ++i) {
            let x = RNG.range(this.xMin, this.xMax);
            let y = RNG.range(this.yMin, this.yMax);

            if(this.isInside(x, y)) ctx.fillStyle = '#22F';
            else ctx.fillStyle = '#F22';

            ctx.fillRect(x, y, 1, 1);
        }
    }

    static execTests() {
        Doc.startNewSection(`Aire d'un polygone`);

        const { canvas, ctx } = Doc.createAndAddCanvas(600, 600); 

        const p = new Polygone(15, 300);

        p.drawMonteCarlo(ctx);
        p.draw(ctx);

        Doc.print(`Aire exacte : ${Number(p.exactArea()).toFixed(1)} pixels²`);
        Doc.print(`Aire approximative : ${Number(p.approxArea(1e6)).toFixed(1)} pixels²`);
    }
}

const RNG = require('./RNG');

class Graph {
    constructor(count) {
        this.count = count;

        this.list = new Array();

        for(let y = 0; y < count; ++y) {
            this.list.push(new Array());
        }
    }

    randomArcs() {
        for(let v = 0; v < this.count; ++v) {
            for(let i = 0; i < this.count; ++i) {
                const n = RNG.intRange(0, this.count);
                if(n != v) this.addArc(v, n);
            }
        }
    }

    pathArcs() {
        for(let i = 0; i < this.count - 1; ++i) {
            this.addArc(i, i + 1);
            this.addArc(i + 1, i);
        }
    }

    lolipopArcs() {

        // clique
        for(let v = 0; v < Math.floor(this.count / 2); ++v) {
            for(let i = 0; i < this.count; ++i) {
                if(v != i) this.addArc(v, i);
            }
        }

        // path
        for(let v = Math.floor(this.count / 2); v < this.count; ++v) {
            this.addDoubleArc(v, v - 1);
        }
    }

    getCount() {
        return this.count;
    }

    addArc(p1, p2) {
        if(!this.list[p1].includes(p2, 0)) this.list[p1].push(p2);
    }

    addDoubleArc(p1, p2) {
        this.addArc(p1, p2);
        this.addArc(p2, p1);
    }

    addArcs(p, ...other) {
        for(const o of other) this.addArc(p, o);
    }

    getAdjsOf(p) {
        return this.list[p];
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    hitingTime(start, end) {
        let current = start;
        let count = 0;

        while(current != end) {
            current = RNG.item(this.getAdjsOf(current));
            ++count;
        }

        return count;
    }

    testHitingTime(n, start, end) {
        let mean = -1;

        for(let i = 0; i < n; ++i) {   
            const count = this.hitingTime(start, end);
            
            if(mean == -1) mean = count;
            else mean = (mean + count) / 2
        }

        return mean;
    }

    coverTime(start = 0) {
        let current = start;
        let count = 0;

        let visitCount = this.count;
        let visited = new Array(this.count).fill(false);

        while(visitCount > 0) {
            if(!visited[current]) {
                visited[current] = true;
                --visitCount;
            }

            current = RNG.item(this.getAdjsOf(current));
            ++count;
        }

        return count;
    }

    testCoverTime(n, start = 0) {
        let mean = -1;

        for(let i = 0; i < n; ++i) {   
            const count = this.coverTime(start);
            
            if(mean == -1) mean = count;
            else mean = (mean + count) / 2
        }

        return mean;
    }
}
exports.Graph = Graph;

exports.GridGraph = class GridGraph extends Graph {
    constructor(width, height) {
        super(width * height);

        this.width = width;
        this.height = height;

        for(let x = 0; x < width; ++x) {
            for(let y = 0; y < height; ++y) {
                const baseIndex = this.coordToindex(x, y);

                this.addArcVerif(baseIndex, this.coordToindex(x + 1, y + 1));
                this.addArcVerif(baseIndex, this.coordToindex(x + 1, y    ));
                this.addArcVerif(baseIndex, this.coordToindex(x + 1, y - 1));
                this.addArcVerif(baseIndex, this.coordToindex(x    , y - 1));
                this.addArcVerif(baseIndex, this.coordToindex(x - 1, y - 1));
                this.addArcVerif(baseIndex, this.coordToindex(x - 1, y    ));
                this.addArcVerif(baseIndex, this.coordToindex(x - 1, y + 1));
                this.addArcVerif(baseIndex, this.coordToindex(x    , y + 1));
            }
        }
    }

    addArcVerif(p1, p2) {
        if(p1 != p2) this.addDoubleArc(p1, p2);
    }

    coordToindex(x, y) {
        if(x < 0) x = 0;
        else if(x >= this.width) x = this.width - 1;

        if(y < 0) y = 0;
        else if(y >= this.height) y = this.height - 1;

        return x + y * this.height;
    }

    dist(x1, y1, x2, y2) {
        return Math.hypot((x1 - x2), (y1 - y2));
    }
}

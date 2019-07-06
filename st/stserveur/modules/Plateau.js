module.exports = class Plateau {
    constructor(w, h) {
        this.w = w;
        this.h = h;

        this.reset();
    }

    reset() {
        this.matrix = new Array();
        for(let y = 0; y < this.h; ++y) {
            this.matrix.push(new Array(this.w));
        }

        this.clearMatrix();
    }

    setMatrix(x, y, val) {
        if(x >= 0 && y >= 0 && x < this.w && y < this.h) this.matrix[y][x] = val;
    }

    clearMatrix() {
        for(let y = 0; y < this.h; ++y) {
            for(let x = 0; x < this.w; ++x) {
                this.matrix[y][x] = 0;
            }
        }
    }

    getMatrix() {
        return this.matrix;
    }
}
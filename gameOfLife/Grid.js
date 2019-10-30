class Grid {
    constructor(width, heigth, initValue = 0) {
        this.width = width;
        this.heigth = heigth;
        this.grid = new Array(width * heigth);

        this.clear(initValue);
    }

    clear(initValue = 0) {
        const length = this.width * this.heigth;

        for(let i = 0; i < length; ++i) {
            this.grid[i] = initValue;
        }
    }

    set(x, y, value) {
        x = this.constrainX(x);
        y = this.constrainY(y);

        this.grid[x + y * this.width] = value;
    }

    get(x, y) {
        x = this.constrainX(x);
        y = this.constrainY(y);

        return this.grid[x + y * this.width];
    }

    constrainX(x) {
        if(x < 0) return x + this.width;
        if(x >= this.width) return x - this.width;
        return x;
    }

    constrainY(y) {
        if(y < 0) return y + this.heigth;
        if(y >= this.heigth) return y - this.heigth;
        return y;
    }
}

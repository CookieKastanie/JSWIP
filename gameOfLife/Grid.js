class Grid {
    constructor(width, height, initValue = 0) {
        this.width = width;
        this.height = height;
        this.grid = new Array(width * height);

        this.clear(initValue);
    }

    clear(initValue = 0) {
        const length = this.width * this.height;

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
        if(y < 0) return y + this.height;
        if(y >= this.height) return y - this.height;
        return y;
    }
}

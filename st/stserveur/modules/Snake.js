module.exports = class Snake {
    constructor(id, startPos, dir) {
        this.id = id;
        this.tail = new Array();
        this.dir = dir;
        this.tail.push({x: startPos.x, y: startPos.y});
        this.tail.push({x: startPos.x, y: startPos.y - 1});
    }

    setDir(x, y, name) {
        this.dirName = name;
        this.dir.x = x;
        this.dir.y = y;
    }

    getHead() {
        return this.tail[0];
    }

    move(eat = false){
        const h = this.getHead();

        this.tail.unshift({x: h.x + this.dir.x, y: h.y + this.dir.y});

        if(!eat) this.tail.pop();
    }

    drawInPlateau(plateau) {
        for(const e of this.tail) {
            plateau.setMatrix(e.x, e.y, this.id);
        }
    }

    collideWith(snake, self) {
        const h = this.getHead();

        let first = true;
        for(const t of snake.tail) {
            if(!(first && self) && (t.x == h.x && t.y == h.y)) return true;
            first = false;
        }

        return false;
    }
}
const Snake = require('./Snake');
const Plateau = require('./Plateau');

module.exports = class Game {
    constructor() {
        this.plateau = new Plateau(50, 30);
        this.reset();
    }

    reset() {
        this.plateau.reset();
        this.snakes = new Map();
        this.fruit = {x: -1, y: -1}
        this.snakeMaxId = 1;
        this.setState('waiting');
        this.setFruitPos();
    }

    addPlayer(sockId){
        this.snakes.set(sockId, new Snake(this.snakeMaxId++, {x: 15 + this.snakeMaxId * 3, y: 15 + this.snakeMaxId * 3}, {x: 0, y: -1}));
    }

    setState(state) {
        this.gameState = state;
    }

    getState() {
        return this.gameState;
    }

    setFruitPos() {
        let ok = true;
        do {
            this.fruit.x = Math.floor(Math.random() * this.plateau.w);
            this.fruit.y = Math.floor(Math.random() * this.plateau.h);

            for(const [k, s] of this.snakes) {
                for(let i = 0; i < s.tail.length; ++i) {
                    if(s.tail[i].x == this.fruit.x && s.tail[i].y == this.fruit.y) ok = false;
                }
            }
            
        } while (!ok)
    }

    input(sockId, cmd) {
        const s = this.snakes.get(sockId);

        if(!s) return;

        switch(cmd) {
            case 'up': if(s.dirName != 'down') s.setDir(0, -1, 'up'); break;
            case 'down': if(s.dirName != 'up') s.setDir(0, 1, 'down'); break;
            case 'left': if(s.dirName != 'right') s.setDir(-1, 0, 'left'); break;
            case 'right': if(s.dirName != 'left') s.setDir(1, 0, 'right'); break;
        }
    }

    update() {
        let isEat = false;
        for(const [k, s] of this.snakes) {
            const h = s.getHead();

            let eat = false;
            if((!isEat) && (h.x == this.fruit.x) && (h.y == this.fruit.y)) {
                eat = true;
                isEat = true;
            }

            s.move(eat);

            if(h.x < 0 || h.y < 0 | h.x >= this.plateau.w || h.y >= this.plateau.h) {
                this.snakes.delete(k);
            }
        }

        if(isEat) this.setFruitPos();

        for(const [sockIdA, sa] of this.snakes) {
            for(const [k, sb] of this.snakes) {
                if(sa.collideWith(sb, sa.id == sb.id)){
                    this.snakes.delete(sockIdA);
                }
            }
        }

        if(this.snakes.size == 0) this.setState('waiting');
    }

    draw() {
        this.plateau.clearMatrix();

        for(const [k, s] of this.snakes) {
            s.drawInPlateau(this.plateau);
        }

        this.plateau.setMatrix(this.fruit.x, this.fruit.y, 1001);

        return this.plateau.getMatrix();
    }
}

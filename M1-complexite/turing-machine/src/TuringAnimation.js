const lerp = (a, b, t) => {
    return (1 - t) * a + t * b;
}

export class TuringAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.querySelector('#screen').appendChild(this.canvas);

        this.canvas.width = window.screen.width;
        this.canvas.height = 500;

        this.ctx = this.canvas.getContext('2d');

        this.cellSize = 100;
        this.cellCount = Math.floor(this.canvas.width / this.cellSize + 4);
    }

    draw(t, blank, pStep, nStep) {
        const position = lerp(pStep.position, nStep.position, t);
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.translate(-this.cellSize / 2, -this.cellSize / 2);

        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.save();

        const memeIndex = Math.floor(position);
        this.ctx.translate(memeIndex * this.cellSize, 0);

        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = '#FFF';
        this.ctx.fillStyle = '#FFF';        

        const range = Math.floor(this.cellCount / 2);
        for(let i = -range; i < range; ++i) {
            this.ctx.strokeRect(i * this.cellSize - position * this.cellSize, 0, this.cellSize, this.cellSize);

            const s = nStep.memory[memeIndex + i];
            if(s != undefined && s != blank) {
                this.ctx.fillText(s,
                    i * this.cellSize - position * this.cellSize + this.cellSize / 2,
                    this.cellSize / 2);
            }
        }
        this.ctx.restore();

        this.ctx.lineWidth = 8;
        this.ctx.strokeStyle = '#C792EA';
        this.ctx.strokeRect(0, 0, this.cellSize, this.cellSize);

        this.ctx.fillStyle = '#FFF';
        this.ctx.fillText(pStep.name, this.cellSize / 2, -(this.cellSize / 2));

        this.ctx.restore();
    }
}

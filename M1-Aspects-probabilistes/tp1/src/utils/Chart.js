export class Chart {
    constructor(canvasObj) {
        this.ctx = canvasObj.ctx;
        this.width = canvasObj.canvas.width;
        this.height = canvasObj.canvas.height;

        this.textOffset = 100;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = '#EEE';
        this.ctx.font = '25px Arial';
        this.ctx.fillText('Calcul en cours ...', 10, 50);
    }

    drawRange(begin, end, step, unit) {
        const range = 1/(end - begin);
        this.begin = begin;
        this.end = end;
        this.range = range;

        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.setTransform(this.width, 0, 0, -this.height * range, 0, this.height - this.textOffset);
        this.ctx.strokeStyle = '#EEE';
        this.ctx.fillStyle = '#EEE';
        this.ctx.lineWidth = 1 / this.height;
        for(let i = begin; i < end; i += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(1, i);
            this.ctx.stroke();

            this.ctx.save();
            this.ctx.setTransform(1, 0, 0, 1, 0, -this.textOffset);
            this.ctx.fillText(Number(i).toFixed(2) + unit, 0, this.height - i * this.height * range - 5);
            this.ctx.restore();
        }
    }

    drawDatas(names, datas) {
        const colorNames = ['Rouge', 'Vert', 'Bleu'];
        const colors = ['#F22', '#2F2', '#22F']; 

        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.font = '20px Arial';
        this.ctx.textBaseline = 'top';
        let y = this.height - this.textOffset + 10;
        for(let i = 0; i < names.length; ++i) {
            this.ctx.fillText(`${colorNames[i]} : ${names[i]}`, 10, y + 20 * i);
        }
        this.ctx.restore();

        this.ctx.lineWidth = 2 / this.height;

        const offset = 1 + (1 / datas.length * 2);
        for(let m = 0; m < names.length; ++m) {
            this.ctx.strokeStyle = colors[m]
            
            this.ctx.beginPath();
            for(let i = 0; i < datas.length; ++i) {
                if(i == 0) this.ctx.moveTo((i / datas.length) * offset, datas[i].value[m]);
                else this.ctx.lineTo((i / datas.length) * offset, datas[i].value[m]);
            }
            this.ctx.stroke();
        }
    }
}

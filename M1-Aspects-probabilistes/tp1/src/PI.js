import { Doc } from "./utils/Doc";
import { RNG } from "./utils/RNG";
import { Task } from "./utils/Task";
import { Timer } from "./utils/Timer";

export class PI {
    static calculate1(n = 1e8, r = 1) {
        let s = 0;

        for(let i = 0; i < n; ++i) {
            const x = RNG.range(0, r);
            s += Math.sqrt((r * r) - (x * x));
        }

        return (4 * s) / (n * r);
    }

    static calculate2(n = 1e8, r = 1) {
        let c = 0;

        for(let i = 0; i < n; ++i) {
            const x = RNG.range(0, r);
            const y = RNG.range(0, r);

            if(x * x + y * y < r * r) ++c;
        }

        return (4 * c) / n;
    }

    static calculate3(n = 1e8, w = 1, l = 1) {
        let count = 0;

        for(let i = 0; i < n; ++i) {
            const a = RNG.range(0, Math.PI);
            let y = Math.sin(a) * l;

            /*
            let x = RNG.range(0, l);
            let y = RNG.range(0, l);
            let length = Math.sqrt(x * x + y * y);
            y = (y / length) * l;
            */

            y += RNG.range(0, w);
            while(y >= w) {
                y -= w;
                ++count;
            }
        }

        return (2 * n * l) / (count * w);
    }

    static compareTime(n = 1e6, testCount = 10) {
        const timer = new Timer();
        timer.start();
        for(let i = 0; i < testCount; ++i) PI.calculate1(n, 1);
        timer.stop();

        const meth1Mean = timer.getDelta() / testCount;

        timer.start();
        for(let i = 0; i < testCount; ++i) PI.calculate2(n, 1);
        timer.stop();

        const meth2Mean = timer.getDelta() / testCount;


        timer.start();
        for(let i = 0; i < testCount; ++i) PI.calculate3(n, 2, 3);
        timer.stop();

        const meth3Mean = timer.getDelta() / testCount;

        return [
            meth1Mean,
            meth2Mean,
            meth3Mean
        ]
    }

    static compareSpeed(max = 1e7, multStep = 1e1) {
        const results = new Array();

        for(let i = multStep; i <= max; i *= multStep) {
            results.push({
                n: i,
                times: PI.compareTime(i, 10)
            });
        }

        return results;
    }

    static comparePrecision() {
        
    }

    ///////////////////////////////////////////////////



    static drawCalculate1(ctx, n, r) {
        ctx.fillStyle = '#2F2';

        for(let i = 0; i < n; ++i) {
            const x = RNG.range(0, r);
            const y = Math.sqrt((r * r) - (x * x));

            ctx.fillRect(x, y, 1, 1);
        }
    }


    static drawCalculate2(ctx, n, r) {
        for(let i = 0; i < n; ++i) {
            const x = RNG.range(0, r);
            const y = RNG.range(0, r);

            if(x * x + y * y < r * r) ctx.fillStyle = '#22F';
            else ctx.fillStyle = '#F22';

            ctx.fillRect(x, y, 1, 1);
        }
    }

    static drawCalculate3(ctx, canvasWidth, canvasHeight, n, w, l) {
        ctx.strokeStyle = '#EEE';
        for(let i = w; i < canvasHeight; i += w) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvasWidth, i);
            ctx.stroke();
        }

        for(let i = 0; i < n; ++i) {
            const a = RNG.range(0, Math.PI);
            let x = Math.cos(a) * l;
            let y = Math.sin(a) * l;

            let tx = RNG.range(0, canvasWidth);
            let ty = RNG.range(0, canvasHeight);

            if(y + (ty % w) >= w) ctx.strokeStyle = '#22F';
            else ctx.strokeStyle = '#F22';

            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(x + tx, y + ty);
            ctx.stroke();
        }
    }


    static execTests() {
        Doc.startNewSection('Estimation de PI');

        const ctx1 = Doc.createAndAddCanvas(500, 500, 'Visualisation méthode 1').ctx;
        ctx1.setTransform(1, 0, 0, -1, 0, 500); // Pour faire pointer l'axe Y vers le haut
        PI.drawCalculate1(ctx1, 500, 500);

        const ctx2 = Doc.createAndAddCanvas(500, 500, 'Visualisation méthode 2').ctx;
        ctx2.setTransform(1, 0, 0, -1, 0, 500); // Pour faire pointer l'axe Y vers le haut
        PI.drawCalculate2(ctx2, 15000, 500);

        const ctx3 = Doc.createAndAddCanvas(500, 500, 'Visualisation méthode 3').ctx;
        ctx3.setTransform(1, 0, 0, -1, 0, 500); // Pour faire pointer l'axe Y vers le haut
        PI.drawCalculate3(ctx3, 500, 500, 35, 500 / 5, 500 / 3);

        Doc.br();
        Doc.print(`PI : ${Math.PI}...`);

        const p1 = Doc.print(`Calcul de l'estimation en cours ...`);
        Task.submit({
            class: 'PI',
            func: 'calculate1',
            args: [1e8, 1]
        }).then(e => {
            p1.textContent = `Estimation à 3 digits (Méthode 1) : ${e.result} (en ${e.seconds} s)`;
        });

        const p2 = Doc.print(`Calcul de l'estimation en cours ...`);
        Task.submit({
            class: 'PI',
            func: 'calculate2',
            args: [1e8, 1]
        }).then(e => {
            p2.textContent = `Estimation à 3 digits (Méthode 2) : ${e.result} (en ${e.seconds} s)`;
        });

        const p3 = Doc.print(`Calcul de l'estimation en cours ...`);
        Task.submit({
            class: 'PI',
            func: 'calculate3',
            args: [1e8, 2, 3]
        }).then(e => {
            p3.textContent = `Estimation à 3 digits (Méthode 3) : ${e.result} (en ${e.seconds} s)`;
        });


        const sCtx = Doc.createAndAddCanvas(600, 500, 'Vitesses de calcul moyennes').ctx;
        sCtx.setTransform(1, 0, 0, 1, 0, 0);
        sCtx.fillStyle = '#EEE';
        sCtx.font = '25px Arial';
        sCtx.fillText('Calcul en cours ...', 10, 50);

        Task.submit({
            class: 'PI',
            func: 'compareSpeed',
            args: [1e7, 1e1]
        }).then(e => {
            const results = e.result;
            sCtx.fillStyle = '#111';
            sCtx.fillRect(0, 0, 600, 500);

            sCtx.setTransform(600, 0, 0, 500, 0, 0);
            sCtx.translate(0, -0.2);
            sCtx.strokeStyle = '#EEE';
            sCtx.fillStyle = '#EEE';
            sCtx.lineWidth = 1 / 500;
            for(let i = 0; i < 1; i += 0.1) {
                sCtx.beginPath();
                sCtx.moveTo(0, 1 - i);
                sCtx.lineTo(1, 1 - i);
                sCtx.stroke();

                sCtx.save();
                sCtx.setTransform(1, 0, 0, 1, 0, -0.2 * 500);
                sCtx.fillText(Number(i).toFixed(1) + 's', 0, 500 - i * 500 - 5);
                sCtx.restore();
            }

            sCtx.save();
            sCtx.setTransform(1, 0, 0, 1, 0, 0);
            sCtx.font = '20px Arial';
            sCtx.fillText('Rouge : Méthode 1', 10, 440);
            sCtx.fillText('Vert : Méthode 2', 10, 460);
            sCtx.fillText('Bleu : Méthode 3', 10, 480);
            sCtx.restore();

            sCtx.lineWidth = 2 / 500;

            for(let m = 0; m < 3; ++m) {
                if(m == 0) sCtx.strokeStyle = '#F22';
                if(m == 1) sCtx.strokeStyle = '#2F2';
                if(m == 2) sCtx.strokeStyle = '#22F';
                
                sCtx.beginPath();
                sCtx.moveTo(0, 1);
                for(let i = 0; i < results.length; ++i) {
                    sCtx.lineTo(i / results.length, 1 - results[i].times[m]);
                }
                sCtx.stroke();
            }
        });
    }
}

import { Doc } from "./utils/Doc";
import { RNG } from "./utils/RNG";
import { Task } from "./utils/Task";

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
            //const a = RNG.range(0, Math.PI / 2);
            //let y = Math.sin(a) * l;


            let x = RNG.range(0, l);
            let y = RNG.range(0, l);
            let length = Math.sqrt(x * x + y * y);
            y = (y / length) * l;


            y += RNG.range(0, w);
            while(y >= w) {
                y -= w;
                ++count;
            }
        }

        return (2 * n * l) / (count * w);
    }

    ///////////////////////////////////////////////////


    static drawCalculate2(ctx, n, r) {
        for(let i = 0; i < n; ++i) {
            const x = RNG.range(0, r);
            const y = RNG.range(0, r);

            if(x * x + y * y < r * r) ctx.fillStyle = '#22F';
            else ctx.fillStyle = '#F22';

            ctx.fillRect(x, y, 1, 1);
        }
    }

    static execTests() {
        Doc.startNewSection('Estimation de PI');

        const { canvas, ctx } = Doc.createAndAddCanvas(500, 500);

        ctx.setTransform(1, 0, 0, -1, 0, 500); // Pour faire pointer l'axe Y vers le haut
        PI.drawCalculate2(ctx, 15000, 500);

        Doc.print(`PI : ${Math.PI}...`);

        Doc.printFuture(Task.submit({
            class: 'PI',
            func: 'calculate1',
            args: [1e8, 1]
        }), {
            waiting: `Calcul de l'estimation en cours ...`,
            before: 'Estimation (technique 1) : ',
            after: ''
        });

        Doc.printFuture(Task.submit({
            class: 'PI',
            func: 'calculate2',
            args: [1e8, 1]
        }), {
            waiting: `Calcul de l'estimation en cours ...`,
            before: 'Estimation (technique 2) : ',
            after: ''
        });

        Doc.printFuture(Task.submit({
            class: 'PI',
            func: 'calculate3',
            args: [1e8, 2, 3]
        }), {
            waiting: `Calcul de l'estimation en cours ...`,
            before: 'Estimation (technique 3) : ',
            after: ''
        });
    }
}

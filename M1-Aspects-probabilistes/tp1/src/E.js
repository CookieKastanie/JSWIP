import { Chart } from "./utils/Chart";
import { Doc } from "./utils/Doc";
import { RNG } from "./utils/RNG";
import { Task } from "./utils/Task";
import { Timer } from "./utils/Timer";

export class E {
    // Méthode 1
    static calculate1(N) {
        let sum = 0;

        for(let i = 0; i < N; ++i) {
            let n = 0;
            let count = 0;

            while(n < 1) {
                n += RNG.range(0, 1);
                ++count;
            }

            sum += count;
        }

        return sum / N;
    }

    // Méthode 2
    static calculate2(N) {
        let sum = 0;

        for(let i = 0; i < N; ++i) {
            let suiv = 1;
            let prec = 0;
            let count = 0;

            do {
                prec = suiv;
                suiv = RNG.range(0, 1);
                ++count;
            } while(suiv <= prec);

            sum += count;
        }

        return sum / N;
    }


    static compare(n = 1e6, testCount = 10) {
        const times = new Array(2);
        const differences = [0, 0];

        const timer = new Timer();
        timer.start();
        for(let i = 0; i < testCount; ++i) differences[0] += Math.abs(Math.E - E.calculate1(n));
        timer.stop();

        times[0] = timer.getDelta() / testCount;
        differences[0] /= testCount;


        timer.start();
        for(let i = 0; i < testCount; ++i) differences[1] += Math.abs(Math.E - E.calculate2(n));
        timer.stop();

        times[1] = timer.getDelta() / testCount;
        differences[1] /= testCount;

        return {
            times,
            differences
        }
    }

    static compareAll(max = 1e7, multStep = 1e1) {
        const timeResults = new Array();
        const differenceResults = new Array();

        for(let i = multStep; i <= max; i *= multStep) {
            const r = E.compare(i, i > 1e7 ? 1 : 10);
            timeResults.push({
                n: i,
                value: r.times
            });

            differenceResults.push({
                n: i,
                value: r.differences
            });
        }

        return {
            times: timeResults,
            differences: differenceResults
        };
    }


    //////////////////////////////////////////////////////////


    static execTests() {
        Doc.startNewSection('Estimation de E');

        Doc.print(`E : ${Math.E}...`);

        const p1 = Doc.print(`Calcul de l'estimation en cours ...`);
        Task.submit({
            class: 'E',
            func: 'calculate1',
            args: [1e8]
        }).then(e => {
            p1.textContent = `Estimation à 3 digits (Méthode 1) : ${e.result} (en ${e.seconds} s)`;
        });

        const p2 = Doc.print(`Calcul de l'estimation en cours ...`);
        Task.submit({
            class: 'E',
            func: 'calculate2',
            args: [1e8]
        }).then(e => {
            p2.textContent = `Estimation à 3 digits (Méthode 2) : ${e.result} (en ${e.seconds} s)`;
        });

        const chart1 = new Chart(Doc.createAndAddCanvas(600, 500, 'Vitesses de calcul moyennes'));
        const chart2 = new Chart(Doc.createAndAddCanvas(600, 500, 'Ecart avec E => | E - Estimation |'));
        Task.submit({
            class: 'E',
            func: 'compareAll',
            args: [1e8, 1e1]
        }).then(e => {
            chart1.drawRange(0, 0.7, 0.1, 's');
            chart1.drawDatas(['Méthode 1', 'Méthode 2'], e.result.times);

            chart2.drawRange(0, 0.4, 0.05, '');
            chart2.drawDatas(['Méthode 1', 'Méthode 2'], e.result.differences);
        });
    }
}

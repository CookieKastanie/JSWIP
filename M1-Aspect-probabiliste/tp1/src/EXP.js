import { Doc } from "./Doc";
import { RNG } from "./RNG";
import { Task } from "./Task";

export class EXP {
    static calculate1(N = 1e8) {
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

    static calculate2(N = 1e8) {
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


    //////////////////////////////////////////////////////////


    static execTests() {
        Doc.startNewSection('Estimation de E');

        Doc.print(`E : ${Math.E}...`);

        Doc.printFuture(Task.submit({
            class: 'EXP',
            func: 'calculate1',
            args: [1e8]
        }), {
            waiting: `Calcul de l'estimation en cours ...`,
            before: 'Estimation (technique 1) : ',
            after: ''
        });

        Doc.printFuture(Task.submit({
            class: 'EXP',
            func: 'calculate2',
            args: [1e8]
        }), {
            waiting: `Calcul de l'estimation en cours ...`,
            before: 'Estimation (technique 2) : ',
            after: ''
        });
    }
}

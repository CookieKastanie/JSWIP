console.log("aluil");

let currentM = new Machine([2, 3, 3, 1]);
let lastM = currentM.clone();

let lastOutput = null;

const guess = (val1, val2, mutate = false, verbose = true) => {
    let ouput = currentM.evaluate([val1, val2])[0];

    ouput = Math.round(ouput);

    if(mutate) {
        if(Math.abs(lastOutput - 10) < Math.abs(ouput - 10)) {
            currentM = lastM;
        } else {
            lastM = currentM.clone();
            currentM.mutate();
        }
    }

    if(verbose) {
        console.log(val1 + " + " + val2 + " = " + ouput);
    } else {
        lastOutput = ouput;
    }
}

const training = () => {
    for(let i = 0; i < 1000000; ++i) {
        /*let v1 = Math.round(Math.random() * 200 - 100);
        let v2 = Math.round(Math.random() * 200 - 100);*/
        let v1 = 5;
        let v2 = 5;
        guess(v1, v2, i != 0, false);
    }
}

const test = () => {
    /*let v1 = Math.round(Math.random() * 200 - 100);
    let v2 = Math.round(Math.random() * 200 - 100);*/
    let v1 = 5;
    let v2 = 5;
    guess(v1, v2, false, true);
}

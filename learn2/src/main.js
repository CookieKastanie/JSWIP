const { Network } = require("./Network");

const inputs = [
    [0.2, 0.2]
];

const outputs = [
    [0.2, 0.2]
];


//const network = new Network([2, 5, 2]);
const network = new Network([2, 2]);
//console.log(network.train(inputs, outputs));


network.train(inputs, outputs);


console.log(network.predict(inputs, true));

window.o = {
    network
}

/*
const { PerceptronTest } = require("./perceptron/PerceptrionTest");

new PerceptronTest();
*/

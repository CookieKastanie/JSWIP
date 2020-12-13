export class Perceptron {
    constructor(n, c) {
        this.weights = new Array(n);
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }

        this.trainingRate = c;

        this.learningErrorNumber = 16;
        this.learningErrorCount = 0;
        this.learningErrorBuffer = new Array(n);
        for(let i = 0; i < this.weights.length; i++) {
            this.learningErrorBuffer[i] = 0;
        }
    }

    train(inputs, desired) {
        let guess = this.forward(inputs);
        let error = desired - guess;

        /*for(let i = 0; i < this.weights.length; ++i) {
            this.weights[i] += this.trainingRate * error * inputs[i];
        }*/

        for(let i = 0; i < this.weights.length; ++i) {
            this.learningErrorBuffer[i] += this.trainingRate * error * inputs[i];
        }

        ++this.learningErrorCount;

        if(this.learningErrorCount == this.learningErrorNumber) {
            for(let i = 0; i < this.weights.length; ++i) {
                this.weights[i] += this.learningErrorBuffer[i] / this.learningErrorNumber;
                this.learningErrorBuffer[i] = 0;
            }

            this.learningErrorCount = 0;
        }
    }

    forward(inputs) {
        let sum = 0;
        for(let i = 0; i < this.weights.length; ++i) {
            sum += inputs[i] * this.weights[i];
        }

        return this.activate(sum);
    }

    activate(sum) {
        if(sum > 0) return 1;
        else return -1;
    }

    getWeights() {
        return this.weights;
    }
}

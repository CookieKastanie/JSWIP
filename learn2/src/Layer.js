import { ActFunc } from "./Utils/ActFunc";
import { Matrix } from "./Utils/Matrix";
import { Vector } from "./Utils/Vector";

export class Layer {
    constructor(nInputs, nNeurons, trainingRate = 0.1) {
        this.weights = Matrix.rnd(nNeurons + 1, nInputs + 1);
        this.setActFunc(ActFunc.reLu);
        this.trainingRate = trainingRate;
    }

    setActFunc(func) {
        this.actFunc = func;
        return this;
    }

    forward(inputs) {
        const output = Matrix.mutateToApplyFunc(
            Matrix.dot(inputs, this.weights),
            this.actFunc
        );

        for(let i = 0; i < output.length; ++i) {
            output[i][output[i].length - 1] = 1;
        }

        return output;
    }

    backward(inputs, desireds) {
        const guesses = this.forward(inputs);
        const errors = Matrix.sub(desireds, guesses);
        console.log(errors)
        

        /*for(let i = 0; i < error.length; ++i) {
            error[i] = Vector.mean(errors[i]);
        }*/
//console.log(errors, inputs)
        const temp = Matrix.dot(Matrix.transpose(errors), inputs);
        console.log(temp)

        const error = new Array(temp.length);
        for(let i = 0; i < error.length; ++i) {
            error[i] = Vector.mean(temp[i]);
        }

        console.log(error)
        //const inputsT = Matrix.transpose(inputs);

        for(let j = 0; j < this.weights.length; ++j) {
            for(let i = 0; i < this.weights[j].length; ++i) {
                this.weights[j][i] += this.trainingRate * error[j];
            }
        }

        return Matrix.transpose(this.weights);
    }
}

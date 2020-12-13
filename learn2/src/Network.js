import { Layer } from "./Layer";
import { Vector } from "./Utils/Vector";

export class Network {
    constructor(layerDesc = []) {
        this.layers = new Array();

        for(let i = 1; i < layerDesc.length; ++i) {
            const layer  = new Layer(layerDesc[i - 1], layerDesc[i]);
            this.layers.push(layer);
        }
    }

    train(x, y) {
        let gesses = this.predict(x, false);

        let output = y;
        for(let i = 0; i < output.length; ++i) {
            output[i].push(1);
        }

        for(let i = this.layers.length - 1; i >= 0; --i) {
            const layer = this.layers[i];
            output = layer.backward(gesses, output);
            gesses = layer.forward(output);
        }
    }

    predict(inputs, removeLast = true) {
        let output = inputs;
        
        for(let i = 0; i < output.length; ++i) {
            output[i].push(1);
        }

        for(let i = 0; i < this.layers.length; ++i) {
            const layer = this.layers[i];
            output = layer.forward(output);
        }

        if(removeLast) {
            for(let i = 0; i < output.length; ++i) {
                output[i].pop();
            }
        }

        return output;
    }
}

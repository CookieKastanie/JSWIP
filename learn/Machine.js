class Branche {
    constructor(node) {
        this.node = node;
        this.value = Math.random() * 2 - 1;
    }

    getValue() {
        return this.value;
    }

    setValue(v) {
        this.value = v;
    }

    emit(val) {
        this.node.recieveValuation(val * this.value);
    }
    
    mutate() {
        this.value += (Math.random() - 0.5) * 0.1;
    }
}

class Node {
    constructor() {
        this.buffer = 0;
        this.lastValue = 0;
        this.branches = new Array();
    }

    addNext(next) {
        this.branches.push(new Branche(next));
    }

    recieveValuation(val) {
        this.buffer += val;
    }

    evaluate() {
        for(const branche of this.branches) {
            branche.emit(this.buffer);
        }

        this.lastValue = this.buffer;
        this.buffer = 0;
    }

    getValue(){
        return this.lastValue;
    }

    mutate() {
        for(const branche of this.branches) {
            branche.mutate();
        }
    }
}

class Layer {
    constructor(nb, machine) {
        this.nodes = new Array();
        for(let i = 0; i < nb; ++i){
            const n = new Node();
            machine.cacheNode.push(n);
            this.nodes.push(n);
        }
    }

    getNodes(){
        return this.nodes;
    }

    link(layer){
        for(const nodeA of this.nodes) {
            for(const nodeB of layer.nodes) {
                nodeA.addNext(nodeB);
            }
        }
    }

    evaluate() {
        for(const node of this.nodes) {
            node.evaluate();
        }
    }

    mutate() {
        for(const node of this.nodes) {
            node.mutate();
        }
    }
}

class Machine {
    constructor(layers) {
        this.cacheNode = new Array();

        if(layers < 3) {
            throw "pas assez de couches";
        }

        this.inputs = new Layer(layers[0], this);
        this.layers = new Array();
        this.layers.push(this.inputs);

        for(let i = 1; i < layers.length - 1; ++i) {
            this.layers.push(new Layer(layers[i], this));
        }

        this.outputs = new Layer(layers[layers.length - 1], this);
        this.layers.push(this.outputs);


        for(let i = 0; i < this.layers.length - 1; ++i) {
            this.layers[i].link(this.layers[i + 1]);
        }
    }

    mutate() {
        for(const layer of this.layers) {
            layer.mutate();
        }
    }

    clone() {
        const lengths = new Array();

        for (const l of this.layers) {
            lengths.push(l.getNodes().length);
        }

        const m = new Machine(lengths);
        for(let i = 0; i < this.cacheNode.length; ++i) {
            let node = this.cacheNode[i];
            let nodeCopy = m.cacheNode[i];

            for(let k = 0; k < node.branches.length; ++k) {
                let branche = node.branches[k];
                let brancheCopy = nodeCopy.branches[k];

                brancheCopy.setValue(branche.getValue());
            }
        }
        
        return m;
    }

    evaluate(inputs) {
        const inputsNodes = this.inputs.getNodes();
        if(inputsNodes.length != inputs.length) throw "nb inputs invalide";

        for(let i = 0; i < inputs.length; ++i) {
            inputsNodes[i].recieveValuation(inputs[i]);
        }

        for(const layer of this.layers) {
            layer.evaluate();
        }

        const result = new Array();

        for(const node of this.outputs.getNodes()) {
            result.push(node.getValue());
        }

        return result;
    }
}

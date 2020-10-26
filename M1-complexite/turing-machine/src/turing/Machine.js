import { Compiler } from './Compiler';

export class Machine {
    constructor(memorySize = 128) {
        this.memZero = Math.floor(memorySize / 2);
        this.memory = new Array(memorySize);
        this.states = new Map();

        this.setBlank('B');
        this.setInput([]);
        this.resetPointer();

        this.traceState = {
            name: '-',
            position: this.getPointer(),
            memory: this.memory.slice()
        }
    }

    resetPointer() {
        this.pointer = this.memZero;
    }

    getPointer() {
        return this.pointer;
    }

    clearMemory() {
        for(let i = 0; i < this.memory.length; ++i) {
            this.memory[i] = this.blank;
        }
    }

    getMemory() {
        return this.memory;
    }

    clearStates() {
        this.states.clear();
    }

    addState(state) {
        this.states.set(state._name_, state);
    }

    setBlank(value) {
        this.blank = value;
    }

    getBlank() {
        return this.blank;
    }

    setStart(value) {
        this.startState = value;
    }

    getStart() {
        return this.startState;
    }

    setInput(value) {
        this.input = value;
    }

    read() {
        return this.memory[this.pointer];
    }

    write(value) {
        this.memory[this.pointer] = value;
    }

    moveRight() {
        this.pointer++;
    }

    moveLeft() {
        this.pointer--;
    }

    getTrace() {
        if(this.isDone()) this.traceState.memory = this.memory;
        return this.traceState;
    }

    load(program) {
        this.clearStates();
        this.setBlank(null);
        this.setStart(null);
        Compiler.compile(this, program);
    }

    prepareExecution() {
        this.clearMemory();
        this.resetPointer();

        for(const v of this.input) {
            this.write(v);
            this.moveRight();
        }

        this.resetPointer();

        this.currentState = this.states.get(this.startState);
        this.done = false;

        this.traceState = {
            name: this.currentState._name_,
            position: this.getPointer(),
            memory: this.memory.slice()
        }
    }

    isDone() {
        return this.done;
    }

    executeStep() {
        if(!this.currentState) {
            this.done = true;
            return;
        }

        const value = this.read();

        const p = this.currentState[value];
        if(p) {
            if(p.nextState) {
                this.currentState = this.states.get(p.nextState);
                this.traceState = {
                    name: p.nextState,
                    position: this.getPointer(),
                    memory: this.memory.slice()
                }
            }

            if(p.newValue) this.write(p.newValue);

            if(p.direction == '<') this.moveLeft();
            else if(p.direction == '>') this.moveRight();
        } else {
            this.done = true;
        }
    }

    memoryToString() {
        let str = this.memory.join('');
        str = str.replace(new RegExp(this.blank, 'g'), ' ');
        return str;
    }
}

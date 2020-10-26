import { Editor } from './Editor';
import { Machine } from './turing/Machine';
import { TuringAnimation } from './TuringAnimation';

export class TuringSimulation {
    constructor() {
        this.machine = new Machine(64);
        this.running = false;

        this.tick = 0;
        this.next = 30;

        this.animation = new TuringAnimation();

        this.prevStep = this.machine.getTrace();
    }

    run() {
        try {
            this.machine.load(Editor.getValue());
            this.machine.prepareExecution();

            Editor.displayNoError();

            this.running = true;
            this.tick = 0;

            this.prevStep = this.machine.getTrace();
        } catch(e) {
            Editor.displayError(e);
        }
    }

    update() {
        if(!this.running) return;

        if(this.tick++ >= this.next) {
            this.prevStep = this.machine.getTrace();

            if(!this.machine.isDone()) this.machine.executeStep();
            else this.running = false;

            this.tick = 0;
        }
    }

    draw() {
        this.animation.draw(
            this.tick / this.next,
            this.machine.getBlank(),
            this.prevStep,
            this.machine.getTrace()
        );

        //console.log(this.machine.memoryToString());
    }
}



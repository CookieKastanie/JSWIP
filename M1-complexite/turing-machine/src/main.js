import './css/CSS';
import split from './libs/split/split';
import { Editor } from './Editor';
import { TuringSimulation } from './TruringSimulation';
import { Exemples } from './Exemples';

document.querySelector('#authors').textContent = 'Complexité - Jérémy André & Thomas Pupunat';

split(['#result-panel', '#code-panel'], {sizes: [67, 33]});

Editor.init(document.querySelector('#code-inject'));

Exemples.loadAddBin();

const turingSimulation = new TuringSimulation();

const execButton = document.querySelector('#execute-button');
execButton.addEventListener('click', () => {
    turingSimulation.run();
});

const loop = () => {
    turingSimulation.update();
    turingSimulation.draw();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

import { Text } from "../lang/Text";
import { Editor } from "./Editor";
import split from '../libs/split/split';
import { Process } from "../process/Process";

export class UI {
    static init() {
        Text.init();
        Editor.init(document.getElementById('code-inject'));
        split(['#result-panel', '#code-panel'], {sizes: [67, 33]});
    }

    static createMenus() {
        const selectorLabel = document.querySelector('#buffer-selector-label');
        selectorLabel.textContent = Text.get('bufferSelectorLabel');

        const selector = document.querySelector('#buffer-selector');
        const chars = ['A', 'B', 'C', 'D'];
        for(let i = 0; i < Process.layerNumber; ++i) {
            const option = document.createElement('option');
            option.classList.add('buffer-selector-option');
            option.textContent = chars[i];
            selector.appendChild(option);
        }

        selector.addEventListener('change', () => {
            Process.selectLayer(selector.selectedIndex);
        });
    }
}

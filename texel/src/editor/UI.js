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
        document.querySelector('#width-selector-label').textContent = Text.get('width');
        document.querySelector('#height-selector-label').textContent = Text.get('height');

        const widthSelector = document.querySelector('#width-selector');
        const heightSelector = document.querySelector('#height-selector');
        const sizeButton = document.querySelector('#size-button');
        sizeButton.textContent = Text.get('apply');

        const displaySize = (width, height) => {
            widthSelector.value = Math.max(width, 1);
            heightSelector.value = Math.max(height, 1);
        }

        displaySize(Process.getSelectedLayer().getWidth(), Process.getSelectedLayer().getHeight());

        sizeButton.addEventListener('click', () => {
            displaySize(widthSelector.value, heightSelector.value);
            Process.setSelectedLayerSize(widthSelector.value, heightSelector.value);
        });



/////////////////////////////////////////////////////////////////////////////////////////////


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
            displaySize(Process.getSelectedLayer().getWidth(), Process.getSelectedLayer().getHeight());
        });


/////////////////////////////////////////////////////////////////////////////////////////////

        const textureLabel = document.querySelector('#texture-label');
        textureLabel.textContent = Text.get('textureLabel');

        const texturePanel = document.querySelector('#texture-panel');
        for(let i = 0; i < Process.textureNumber; ++i) {
            const imageHolder = document.createElement('div');
            imageHolder.classList.add('flex');
            imageHolder.classList.add('imageHolder');

            const label = document.createElement('label');
            label.classList.add('textureLabel');

            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');




            const img = document.createElement('img');
            img.setAttribute('src', './img/placeholder.png');


            // Bouton pour applique la taille de l'image au buffer
            const imageSizeButton = document.createElement('button');
            imageSizeButton.addEventListener('click', () => {
                displaySize(img.naturalWidth, img.naturalHeight);
                Process.setSelectedLayerSize(img.naturalWidth, img.naturalHeight);
            });
            imageSizeButton.classList.add('image-size-button');
            imageSizeButton.classList.add('hidden');

            

            input.addEventListener('change', event => {
                const input = event.target;
                const index = i;
                if(input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        img.src = e.target.result;
                        img.onload = () => {
                            Process.updateTexture(index, img);
                            imageSizeButton.classList.remove('hidden');
                            imageSizeButton.textContent = `${img.naturalWidth} x ${img.naturalHeight}`;
                        }
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            });

            label.appendChild(input);
            label.appendChild(img);
            label.appendChild(imageSizeButton);
            imageHolder.appendChild(label);
            texturePanel.appendChild(imageHolder);
        }
    }
}

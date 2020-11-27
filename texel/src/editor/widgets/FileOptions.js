import { Text } from "../../lang/Text";
import { Process } from "../../process/Process";
import { UITools } from "../UITools";

import './FileOptions.css';

export class FileOptions {
    constructor(conatainer) {
        const fileOptionsButton = UITools.create('button', {class: 'file-options-button', text: Text.get('fileOptions')});

        const dropdown = UITools.create('div', {class: 'file-options-content'});

        const importinput = UITools.create('input', {value: Text.get('import'), type: 'file', accept: '.texel'});
        importinput.addEventListener('change', event => {
            const input = event.target;
            if(input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    Process.uploadPrograms(e.target.result);
                };
                reader.readAsText(input.files[0]);
            }
        });
        dropdown.appendChild(importinput);

        const exportButton = UITools.create('button', {text: Text.get('export')});
        exportButton.addEventListener('click', () => {
            Process.downloadPrograms();
        });
        dropdown.appendChild(exportButton);


        conatainer.appendChild(fileOptionsButton);
        conatainer.appendChild(dropdown);
    }
}
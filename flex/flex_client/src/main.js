import './main.css';

import { Flex } from './Flex';
import { UITools } from './UITools';

const flex = new Flex();

const refreshList = () => {
    flex.getFilesList().then(files => {
        const div = UITools.cleanQuery('#list');

        for(const f of files) {
            const d = UITools.create('div');

            const p = UITools.create('pre', {text: f.name}); 
            const psw = UITools.create('input', {type: 'text', placeholder: 'Mot de passe'});
            const dow = UITools.create('button', {text: 'Télécharger'});
            const del = UITools.create('button', {text: 'Supprimer'});


            dow.addEventListener('click', () => {
                const a = UITools.create('a', {
                    href: `${flex.host}/get/${f.name}/${psw.value ? psw.value : '_'}`,
                    download: f.name,
                    style: 'display: none;'
                });
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

            del.addEventListener('click', () => {
                flex.delete(f.name, psw.value).then(() => {
                    refreshList();
                });
            });

            d.appendChild(p);
            d.appendChild(psw);
            d.appendChild(dow);
            d.appendChild(del);
            div.appendChild(d);
        }
    });
}


let isUploading = false;

UITools.query('#files').addEventListener('change', () => {
    if(!isUploading) {
        const nameInput = UITools.query('#name');
        const files = UITools.query('#files').files;
        if(files.length > 0 && nameInput.value.trim() == '') nameInput.value = files[0].name;
    }
});

const form = UITools.query('#upload');
form.addEventListener('submit', e => {
    e.preventDefault();

    if(isUploading) return false;

    const nameInput = UITools.query('#name');
    const pswInput = UITools.query('#psw');
    const filesInput = UITools.query('#files');

    const progressBar = UITools.query('#progressBar');

    isUploading = true;
    flex.send(nameInput.value, pswInput.value, 0, filesInput.files, e => {
        const percent = (e.loaded / e.total) * 100;
        progressBar.value = Math.round(percent);
    }).then(() => {
        refreshList();

        nameInput.value = '';
        pswInput.value = '';
        filesInput.value = '';

        isUploading = false;
    }).catch(() => {
        isUploading = false;
    });

    return false;
});

refreshList();

window.flex = flex;

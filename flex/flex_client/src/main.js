import './main.css';

import { Flex } from './Flex';
import { UITools } from './UITools';

const flex = new Flex();

const copyToClipboard = str => {
    navigator.clipboard.writeText(str).then(() => {}).catch(console.log);
};

const refreshList = () => {
    flex.getFilesList().then(files => {
        const table = UITools.cleanQuery('#list');

        for(const f of files) {
            const tr = UITools.create('tr');

            const p = UITools.create('p', {text: f.name}); 
            const psw = UITools.create('input', {type: 'text', class: 'form-control', placeholder: 'Mot de passe'});
            const dow = UITools.create('button', {text: 'Télécharger', class: ['btn', 'btn-outline-info']});
            const link = UITools.create('button', {text: '🔗', class: ['btn', 'btn-outline-secondary']});
            const del = UITools.create('button', {text: 'Supprimer', class: ['btn', 'btn-outline-danger']});


            dow.addEventListener('click', () => {
                const a = UITools.create('a', {
                    href: flex.linkFrom(f.name, psw.value),
                    download: f.name,
                    style: 'display: none;'
                });
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });

            link.addEventListener('click', () => {
                copyToClipboard(flex.linkFrom(f.name, psw.value));
            });

            del.addEventListener('click', () => {
                flex.delete(f.name, psw.value).then(() => {
                    refreshList();
                });
            });

            tr.appendChild(UITools.encap('td', p, {class: 'td-data'}));
            tr.appendChild(UITools.encap('td', psw, {class: 'td-data'}));
            tr.appendChild(UITools.encap('td', dow));
            tr.appendChild(UITools.encap('td', link));
            tr.appendChild(UITools.encap('td', del));
            table.appendChild(tr);
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
        progressBar.setAttribute('style', `width:${Math.round(percent)}%`);
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

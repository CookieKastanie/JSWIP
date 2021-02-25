import './css/loadCss';
import { ColorTranslator } from './ColorTranslator';

const ct = new ColorTranslator();
const vals = new Object();

ct.disableAlpha();

const convertFrom = (type, val) => {
    switch (type) {
        case 'hex': ct.setFromHex(val); break;
        case 'hexSmall': ct.setFromHexSmall(val); break;
        case 'dec': ct.setFromDecimal(val); break;
        case 'int': ct.setFromInteger(val); break;
    }
}

const inputs = document.querySelectorAll('.textColorInput');
const setInputs = () => {
    vals['hex'] = ct.getHex();
    vals['hexSmall'] = ct.getHexSmall();
    vals['dec'] = ct.getDecimal();
    vals['int'] = ct.getInteger();

    for (let j of inputs) {
        j.value = vals[j.id];
    }
}

for (let i of inputs) {
    i.onchange = () => {
        convertFrom(i.id, i.value);
        setInputs();
    }
}
setInputs();


const alphaCheckbox = document.querySelector('#alpha');
alphaCheckbox.checked = false;
alphaCheckbox.addEventListener('change', (e) => {
    if(e.target.checked) ct.enableAlpha();
    else ct.disableAlpha();
    setInputs();
});

/////////////////////////////////////


import { colors } from './colors';

const colorClick = (e) => {
    const color = e.target.getAttribute('data');
    convertFrom('hex', color);
    setInputs();
}

const p1 = document.querySelector('#palette1');

for(let i = 0; i < colors.palette1.length; ++i) {
    const tr = document.createElement('tr');

    for(let j = 0; j < colors.palette1[0].length; ++j) {
        const td = document.createElement('td');
        const div = document.createElement('div');
        td.appendChild(div);

        const c = colors.palette1[i][j];
        div.setAttribute('data', c);
        div.classList.add('color');
        div.setAttribute('style', `background-color: #${c}`);
        div.addEventListener('click', colorClick);

        if(i == 0) {
            const span = document.createElement('span');
            span.textContent = colors.palette1Names[j];
            div.appendChild(span);
        }

        tr.appendChild(td);
    }

    p1.appendChild(tr);
}



const copyColorButtons = document.querySelectorAll('.copyColorButton');

for(const ccb of copyColorButtons) {
    ccb.addEventListener('click', (e) => {
        const type = e.target.getAttribute('data');
        copyToClipboard(vals[type]);
    });
}


const copyToClipboard = text => {
    navigator.clipboard.writeText(text).catch(e => {
        const temp = document.createElement('input');
        document.querySelector('body').append(temp);
        temp.value = text;
        temp.select();
        document.execCommand('copy');
        temp.remove();
    });
}

export class Doc { // Classe utilitaire pour construire le document html dynamiquement
    static init() {
        Doc.container = document.querySelector('#content');
    }

    static printTitle(title) {
        const h1 = document.createElement('h1');
        h1.textContent = title;
        Doc.container.appendChild(h1);
    }

    static startNewSection(title) {
        Doc.currentSection = document.createElement('section');
        Doc.container.appendChild(Doc.currentSection);

        if(title) {
            const h2 = document.createElement('h2');
            h2.textContent = title;
            Doc.currentSection.appendChild(h2);
        }
    }

    static createAndAddCanvas(width, height) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, width, height);
        ctx.translate(canvas.width / 2, canvas.height / 2);

        Doc.currentSection.appendChild(canvas);

        return {canvas, ctx};
    }

    static print(str) {
        const p = document.createElement('p');
        p.textContent = str;
        Doc.currentSection.appendChild(p);

        return p;
    }

    static printFuture(f, texts) {
        const p = Doc.print(texts.waiting);
        f.then(e => {
            p.textContent = `${texts.before}${e.result}${texts.after} (en ${Number(e.seconds).toFixed(3)} s)`;
        });
    }
}

Doc.container = null;
Doc.currentSection = null;

class MatriceDistance {
    constructor(largeur, hauteur) {
        this._largeur = largeur;
        this._hauteur = hauteur;
        this.matrice = new Array(largeur * hauteur)
    }

    set(x, y, value) {
        this.matrice[y * this._largeur + x] = value;
    }

    get(x, y) {
        return this.matrice[y * this._largeur + x];
    }

    largeur() {
        return this._largeur;
    }

    hauteur() {
        return this._hauteur;
    }
}

class Dictionnaire {
    constructor(file = "") {
        this.fromFile(file);
    }

    fromFile(file) {
        const mots = file.split("\n");

        this.listeTrigrammes = {};

        for(const mot of mots) {
            const motChevrons = '<'+ mot +'>';
            for(let i = 0; i <= motChevrons.length - 3; ++i) {
                const trigramme = motChevrons.substr(i, 3);

                if(!this.listeTrigrammes[trigramme])
                    this.listeTrigrammes[trigramme] = new Array();
                this.listeTrigrammes[trigramme].push(mot);
            }
        }
    }

    getListsFromWord(mot) {
        const localDico = {};
        const result = new Array();

        const trigrammes = this.getTrigrammes(mot);
        
        for(const trigramme of trigrammes) {
            const list = this.trigrammeToList(trigramme);

            if(!list) continue;

            for (const localMot of list) {
                if(!localDico[localMot]) localDico[localMot] = 0;
                localDico[localMot]++;

                if(this.distanceJaccard(mot, localMot, localDico[localMot]) > 0.2 && !result.includes(localMot))
                    result.push(localMot);
            }
        }

        return result;
    }

    distanceJaccard(m, d, nb) {
        return nb / (m.length + d.length - nb);
    }

    getTrigrammes(mot) {
        const trigrammes = new Array();
        const motChevrons = '<'+ mot +'>';

        for(let i = 0; i <= motChevrons.length - 3; ++i) {
            const trigramme = motChevrons.substr(i, 3);
            trigrammes.push(trigramme);
        }

        return trigrammes;
    }

    trigrammeToList(trigramme) {
        return this.listeTrigrammes[trigramme];
    }

    distanceFrom(mot, motAComp) {
        mot = " "+ mot;
        motAComp = " "+ motAComp;
        const matrice = new MatriceDistance(mot.length, motAComp.length);

        for(let i = 0; i < matrice.largeur(); ++i)
            matrice.set(i, 0, i);

        for(let i = 0; i < matrice.hauteur(); ++i)
            matrice.set(0, i, i);

        for(let y = 1; y < matrice.hauteur(); ++y)
            for(let x = 1; x < matrice.largeur(); ++x)
                if(mot[x] == motAComp[y]) matrice.set(x, y, matrice.get(x - 1, y - 1));
                else matrice.set(x, y, 1 + Math.min(matrice.get(x - 1, y), matrice.get(x, y - 1), matrice.get(x - 1, y - 1)));

        return matrice.get(matrice.largeur() - 1, matrice.hauteur() - 1);
    }

    verify(mot) {
        let result = new Array();
        const mots = this.getListsFromWord(mot);

        const sortFunc = (x, y) =>  y.d - x.d;

        for(const localMot of mots) {
            if(localMot == mot) continue

            const d = 1.0 - this.distanceFrom(mot, localMot) / Math.max(mot.length, localMot.length);

            result.push({mot: localMot, d});
            result = result.sort(sortFunc);
        }

        const final = new Array();

        for(let i = 0; i < Math.min(5, result.length); ++i) {
            final.push(result[i].mot);
        }

        return final;
    }
}

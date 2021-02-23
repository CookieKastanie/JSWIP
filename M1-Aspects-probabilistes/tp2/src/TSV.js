module.exports = class TSV {
    constructor() {
        this.columnNames = new Array();
        this.columns = new Map();
    }

    addColumn(name) {
        this.columnNames.push(name);
        this.columns.set(name, new Array());
        return this;
    }

    addTo(name, value) {
        this.columns.get(name).push(value);
        return this;
    }

    cleanAllColumns() {
        for(const n of this.columns.keys()) {
            this.columns.set(n, new Array());
        }
    }

    toString() {
        let b = '';

        for(let name of this.columnNames) {
            b += name +'\t';
        }

        b += '\n';

        let max = 0;
        for(let c of this.columns.values()) {
            if(c.length > max) max = c.length;
        }

        for(let i = 0; i < max; ++i) {
            for(let name of this.columnNames) {
                let c = this.columns.get(name);
                if(i < c.length) {
                    let value = ''+(Math.floor(c[i] * 1e9) / 1e9);
                    b += value.replace('.', ',');
                }
                b += '\t';
            }

            b += '\n';
        }

        return b;
    }

    write(name) {
        const fs = require('fs');
        fs.writeFileSync(`./tsv/${name}.tsv`, this.toString(), 'utf8');
    }
}

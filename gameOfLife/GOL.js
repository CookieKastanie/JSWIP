class GOL {
    constructor(width, heigth, color0 = '#FFF', color1 = '#000') {
        this.grids = [new Grid(width, heigth), new Grid(width, heigth)];
        this.color0 = color0;
        this.color1 = color1;
    }

    swap() {
        this.grids = [this.grids[1], this.grids[0]];
    }

    update() {
        const g0 = this.grids[0];
        const g1 = this.grids[1];

        for(let y = 0; y < g0.heigth; ++y) {
            for(let x = 0; x < g0.heigth; ++x) {
                const etat = g0.get(x, y);
                let count = 0;
                
                count += g0.get(x - 1, y - 1);
                count += g0.get(x, y - 1);
                count += g0.get(x + 1, y - 1);
                count += g0.get(x - 1, y);
                count += g0.get(x + 1, y);
                count += g0.get(x - 1, y + 1);
                count += g0.get(x, y + 1);
                count += g0.get(x + 1, y + 1);

                if(etat == 0 && count == 3) {
                    g1.set(x, y, 1);
                } else if(etat == 1 && (count < 2 || count > 3)) {
                    g1.set(x, y, 0);
                } else {
                    g1.set(x, y, etat);
                }
            }
        }

        this.swap();
    }

    getGrid() {
        return this.grids[0];
    }

    clear() {
        this.getGrid().clear();
    }

    draw(ctx) {
        const g = this.grids[0];

        for(let y = 0; y < g.heigth; ++y) {
            for(let x = 0; x < g.heigth; ++x) {
                ctx.fillStyle = g.get(x, y) == 0 ? this.color0 : this.color1;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}

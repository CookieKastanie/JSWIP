class GOL {
    constructor(width, height, color0 = '#FFF', color1 = '#000', color2 = '#0F0', color3 = '#F00') {
        this.grids = [new Grid(width, height), new Grid(width, height)];
        this.nextStepGrid = new Grid(width, height);
        this.color0 = color0;
        this.color1 = color1;
        this.color2 = color2;
        this.color3 = color3;
    }

    swap() {
        this.grids = [this.grids[1], this.grids[0]];
    }

    update(swap = true) {
        const g0 = this.grids[0];
        const g1 = this.grids[1];

        for(let y = 0; y < g0.height; ++y) {
            for(let x = 0; x < g0.height; ++x) {
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
                    this.nextStepGrid.set(x, y, 2);
                } else if(etat == 1 && (count < 2 || count > 3)) {
                    g1.set(x, y, 0);
                    this.nextStepGrid.set(x, y, 3);
                } else {
                    g1.set(x, y, etat);
                    this.nextStepGrid.set(x, y, (etat == 0 || etat == 3) ? 0 : 1);
                }
            }
        }

        if(swap) this.swap();
    }

    clear() {
        this.grids[0].clear();
        this.nextStepGrid.clear();
    }

    set(x, y, value) {
        this.grids[0].set(x, y, value);
        this.nextStepGrid.set(x, y, value);
    }

    draw(ctx, drawNext = true) {
        let g = this.nextStepGrid;

        ctx.fillStyle = this.color0;
        ctx.fillRect(0, 0, g.width, g.height);

        for(let y = 0; y < g.height; ++y) {
            for(let x = 0; x < g.height; ++x) {

                const etat = g.get(x, y);
                if(drawNext) {
                    if(etat == 1) {
                        ctx.fillStyle = this.color1;
                        ctx.fillRect(x, y, 1, 1);
                    } else if(etat == 2) {
                        ctx.fillStyle = this.color2;
                        ctx.fillRect(x, y, 1, 1);
                    } else if(etat == 3) {
                        ctx.fillStyle = this.color3;
                        ctx.fillRect(x, y, 1, 1);
                    }
                } else {
                    if(etat == 1 || etat == 3) {
                        ctx.fillStyle = this.color1;
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            }
        }
    }
}

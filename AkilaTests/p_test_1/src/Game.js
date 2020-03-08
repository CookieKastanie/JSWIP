import { LinkedStructure } from 'Akila/utils';
import { BroadField2d } from 'Akila/collision';
import { Player } from './Player';

export class Game {
    constructor() {
        this.currentObjects = new LinkedStructure();

        this.player;
        this.field = new BroadField2d();

        this.currentRoom = null;

        this.hitBuffer = new Set();
        this.roomsBuffer = new Set();
    }

    update() {
        this.player.update();

        this.hitBuffer.clear();

        const s = 67;
        this.field.query((this.player.x) / s, (this.player.y + 10) / s, this.hitBuffer);
        this.field.query((this.player.x) / s, (this.player.y) / s, this.hitBuffer);
        this.field.query((this.player.x - 10) / s, (this.player.y) / s, this.hitBuffer);
        this.field.query((this.player.x + 10) / s, (this.player.y) / s, this.hitBuffer);


        const ph = this.player.getHitBox();
        for(let r of this.hitBuffer) {
            if(!
                ((ph.x0 > r.x1) || (ph.x1 < r.x0) || (ph.y0 < r.y1) || (ph.y1 > r.y0))
            ) {
                const dxg = r.x1 - ph.x0;
                const dxd = ph.x1 - r.x0;

                const dyg = ph.y0 - r.y1;
                const dyd = r.y0 - ph.y1;

                const minx = Math.min(Math.abs(dxg), Math.abs(dxd));
                const miny = Math.min(Math.abs(dyg), Math.abs(dyd));

                if(Math.min(minx, miny) == minx) {
                    if(minx == Math.abs(dxg) && dxg > 0) {this.player.x += Math.abs(dxg);}
                    else if(minx == Math.abs(dxd) && dxd > 0) {this.player.x -= Math.abs(dxd);}
                } else {
                    if(miny == Math.abs(dyg) && dyg > 0) this.player.y -= Math.abs(dyg);
                    else if(miny == Math.abs(dyd) && dyd > 0) this.player.y += Math.abs(dyd);
                }
            }
        }



        this.roomsBuffer.clear();
        this.roomsField.query((this.player.x) / s, (this.player.y) / s, this.roomsBuffer);
        for(let r of this.roomsBuffer) {
            if(!
                ((this.player.x > r.x1) || (this.player.x < r.x0) || (this.player.y < r.y1) || (this.player.y > r.y0))
            ) {
                this.currentRoom = this.roomDatas[r.id];
                this.currentRoom.bounds = r;
            }
        }
    }
}

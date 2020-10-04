import { MaterialsManager } from "../rendering/materials/MaterialsManager";
import { MeshsManager } from "../rendering/meshs/MeshsManager";
import { Entity } from "./Entity";
import { Clock } from "akila/time/Clock";

export class SpriteEntity extends Entity {
    constructor() {
        super();

        this.material = MaterialsManager.getMaterialByName('sprite');
        this.mesh = MeshsManager.getMeshsByName('uvQuad');

        this.sprites = new Map();
        this.currentSprite = null;
    }

    addSprite(name, texture, frameCount, delta = 2) {
        this.sprites.set(name, {
            texture,
            direction: 1,
            width: 1 / frameCount,
            clock: new Clock(0, frameCount, delta)
        });

        if(!this.currentSprite) this.currentSprite = this.sprites.get(name);
    }

    useSprite(name, reverse) {
        this.currentSprite = this.sprites.get(name);
        if(reverse !== undefined) this.currentSprite.direction = reverse ? -1 : 1;
    }

    updateAnimation() {
        this.currentSprite.clock.next();
    }

    beforeRendering() {
        this.material.setTexture(this.currentSprite.texture);
        this.material.setXScale(this.currentSprite.width);

        if(this.currentSprite.direction >= 0) this.material.setXOffset(this.currentSprite.width * this.currentSprite.clock.getValue());
        else this.material.setXOffset((this.currentSprite.width * this.currentSprite.clock.getValue()) - 1);
    }
}

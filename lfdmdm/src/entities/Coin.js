import { TexturesManager } from "../rendering/textures/TexturesManager";
import { SpriteEntity } from "./SpriteEntity";

export class Coin extends SpriteEntity {
    constructor() {
        super();

        this.addSprite('coin', TexturesManager.getTextureByName('coin_4'), 4, 5);
        this.useSprite('coin');
    }
}

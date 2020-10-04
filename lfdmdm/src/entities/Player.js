import { Keyboard } from "akila/inputs/Keyboard";
import { vec2 } from "akila/math";
import { Time } from "akila/time/Time";
import { HitboxesManager } from "../collision/HitboxesManager";
import { TexturesManager } from "../rendering/textures/TexturesManager";
import { SpriteEntity } from "./SpriteEntity";

export class Player extends SpriteEntity {
    constructor() {
        super();

        this.hitbox = HitboxesManager.getHitboxByName('player_hitbox');

        this.addSprite('idle', TexturesManager.getTextureByName('idle_1'), 1, 0);
        this.addSprite('walk', TexturesManager.getTextureByName('walk_2'), 2, 5);

        this.keyboard = new Keyboard();
    }

    update() {
        const dir = vec2.fromValues(
            this.keyboard.isPressed(Keyboard.RIGHT_ARROW) - this.keyboard.isPressed(Keyboard.LEFT_ARROW),
            this.keyboard.isPressed(Keyboard.UP_ARROW) - this.keyboard.isPressed(Keyboard.DOWN_ARROW),
        );

        if(dir[0] != 0 && dir[1] != 0) vec2.normalize(dir, dir);
    

        if(dir[0] == 0 && dir[1] == 0) {
            this.useSprite('idle');
        } else {
            if(dir[0] == 0) this.useSprite('walk');
            else this.useSprite('walk', dir[0] < 0);
        }

        this.transform.translate([
            dir[0] * Time.limitedDelta * 5,
            dir[1] * Time.limitedDelta * 5,
            0
        ]);
    }

    getHitbox() {
        return this.hitbox;
    }
}

import { Mouse } from "akila/inputs/Mouse";
import { Camera } from "../common/Camera";
import { Character } from "../entities/Character";
import { RE } from "../rendering/RE";
import { TexturesManager } from "../rendering/textures/TexturesManager";
import { GameState } from "./GameState";

export class TestGameState extends GameState {
    constructor() {
        super();

        this.mouse = new Mouse();

        this.camera = new Camera();

        this.character = new Character();
        this.character.setTexture(TexturesManager.getTextureByName('idle_1'));

        this.box = new Character();
        this.box.setTexture(TexturesManager.getTextureByName('crate_1'));
        this.box.getTransform().setPosition([2, 0, 0]);
    }

    updateLogic() {
        this.box.getTransform().setPosition([this.mouse.posX() / 200 - 2, -this.mouse.posY() / 100 + 2, -1]);
    }

    render() {
        RE.prepare(this.camera);
        RE.renderEntity(this.character);
        RE.renderEntity(this.box);
        RE.finish();
    }
}

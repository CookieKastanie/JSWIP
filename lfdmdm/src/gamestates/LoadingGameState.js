import { Time } from "akila/time";
import { VAO, VBO } from "akila/webgl";
import { Camera } from "../common/Camera";
import { Transform } from "../common/Transform";
import { MaterialsManager } from "../rendering/materials/MaterialsManager";
import { RE } from "../rendering/RE";
import { TexturesManager } from "../rendering/textures/TexturesManager";
import { GameState } from "./GameState";

export class LoadingGameState extends GameState {
    constructor() {
        super();

        this.cam = new Camera();
        this.mat = MaterialsManager.getMaterialByName('simpleTexture');
        this.mat2 = MaterialsManager.getMaterialByName('loading');
        this.tex = TexturesManager.getTextureByName('loading_arrow');
        this.pos = new Transform();
        this.pos.translate([0, 0, 0.5]);
        this.quad = new VAO()
        .addVBO(new VBO([
            -1,1, 1,-1, 1,1,
            -1,1, -1,-1, 1,-1
        ], 2, 0))
        .addVBO(new VBO([
            0,0, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1
        ], 2, 1));
    }

    render() {
        this.mat.setTexture(this.tex);
        this.pos.rotateZ(Time.limitedDelta * 5);

        RE.prepare();

        RE.setCamera(this.cam)
        RE.renderModel(this.quad, this.mat, this.pos);

        RE.setCamera(null);
        RE.renderModel(this.quad, this.mat2);

        RE.finish();
    }

    onDestroy() {
        this.quad.delete();
    }
}

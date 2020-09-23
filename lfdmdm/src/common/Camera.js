import { mat4, vec3 } from "akila/math";
import { Infos } from "akila/utils";

export class Camera {
    constructor() {
        this.position = vec3.create();
        this.projection = mat4.create();

        const w = Infos.getSimpleOrientation() == Infos.LANDSCAPE ? (Infos.getFullScreenWidth() / Infos.getFullScreenHeight()) * 7 : (Infos.getFullScreenHeight() / Infos.getFullScreenWidth()) * 7;
        const h = 7;
    
        mat4.ortho(this.projection, -w, w, -h, h, -10, 10);
    }

    getVPMatrix() {
        return this.projection;
    }
}

import { mat4 } from "akila/math";
import { Infos } from "akila/utils";
import { Display } from "akila/webgl";
import { MaterialsManager } from "./materials/MaterialsManager";
import { ShaderBuilder } from "./materials/ShaderBuilder";

export class RE {
    static init() {
        if(Infos.getSimpleOrientation() == Infos.LANDSCAPE) RE.display = new Display(Infos.getFullScreenWidth(), Infos.getFullScreenHeight());
        else RE.display = new Display(Infos.getFullScreenHeight(), Infos.getFullScreenWidth());
        RE.display.disable(Display.CULL_FACE);

        RE.mat4Identity = mat4.create();

        RE.currentCamera;
    }

    static prepare(camera) {
        RE.currentCamera = camera;

        RE.display.clear();
    }

    static renderModel(vao, material, transform) {
        const shader = material.getShader();

        if(MaterialsManager.getCurrentMaterialId() != material.getId()) {
            MaterialsManager.setCurrentMaterial(material);
            shader.use();
            shader.sendMat4(ShaderBuilder.U_VP, RE.currentCamera ? RE.currentCamera.getVPMatrix() : RE.mat4Identity);
        }

        shader.sendMat4(ShaderBuilder.U_MODEL, transform ? transform.toMat4() : RE.mat4Identity);

        material.use();

        vao.draw();
    }

    static renderEntity(entity) {
        entity.beforeRendering();
        RE.renderModel(entity.getAttachedMesh(), entity.getAttachedMaterial(), entity.getTransform());
    }

    static finish() {
        MaterialsManager.resetCurrentMaterialId();
    }
}

import { MaterialsManager } from "../rendering/materials/MaterialsManager";
import { MeshsManager } from "../rendering/meshs/MeshsManager";
import { Entity } from "./Entity";

export class Character extends Entity {
    constructor() {
        super();

        this.mesh = MeshsManager.getMeshsByName('uvQuad');
        this.material = MaterialsManager.getMaterialByName('simpleTexture');
    }

    setTexture(texture) {
        this.texture = texture;
    }

    beforeRendering() {
        this.material.setTexture(this.texture);
    }
}

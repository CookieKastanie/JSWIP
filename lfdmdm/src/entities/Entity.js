import { Transform } from "../common/Transform";

export class Entity {
    constructor() {
        this.transform = new Transform();
        this.material = null;
        this.mesh = null;
    }

    getTransform() {
        return this.transform;
    }

    getAttachedMesh() {
        return this.mesh;
    }

    getAttachedMaterial() {
        return this.material;
    }

    beforeRendering() {}
}

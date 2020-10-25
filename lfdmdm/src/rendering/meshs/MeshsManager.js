export class MeshsManager {
    static init() {
        MeshsManager.meshs = new Map();
    }

    static registerMesh(meshs, name) {
        MeshsManager.meshs.set(name, meshs);
    }

    static getMeshsByName(name) {
        return MeshsManager.meshs.get(name);
    }
}

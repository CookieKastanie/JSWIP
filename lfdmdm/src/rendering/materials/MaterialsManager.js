import { ShaderBuilder } from "./ShaderBuilder";

export class MaterialsManager {
    static init() {
        if(!MaterialsManager.isInit) {
            MaterialsManager.shaderBuilder = new ShaderBuilder();
            MaterialsManager.materials = new Map();

            MaterialsManager.currentMat = null;
            MaterialsManager.resetCurrentMaterialId();

            MaterialsManager.isInit = true;
        }
    }

    static registerMaterial(material) {
        const shader = MaterialsManager.shaderBuilder.build(material.getShaderParameters(), material.getName());
        material.setShader(shader);
        MaterialsManager.materials.set(material.getName(), material);
    }

    static getMaterialByName(name) {
        return MaterialsManager.materials.get(name);
    }

    static setCurrentMaterial(material) {
        MaterialsManager.currentMat = material;
        MaterialsManager.currentMatId = material.getId();
    }

    static getCurrentMaterialId() {
        return MaterialsManager.currentMatId;
    }

    static resetCurrentMaterialId() {
        MaterialsManager.currentMatId = -1;
    }
}

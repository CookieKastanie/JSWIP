export class Material {
    constructor(name) {
        this.name = name;
        this.id = Material.maxId++;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setShader(shader) {
        this.shader = shader;
    }

    getShader() {
        return this.shader;
    }

    getShaderParameters() {
        return null;
    }

    use() {}
}

Material.maxId = 0;

export class ShaderPipline {
    constructor() {
        this.shaders = new Array();
    }

    add(shader) {
        this.shaders.push(shader);
    }
}

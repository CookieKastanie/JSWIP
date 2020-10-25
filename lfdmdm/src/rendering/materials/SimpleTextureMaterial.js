import { Material } from "./Material";
import { ShaderBuilder } from "./ShaderBuilder";

export class SimpleTextureMaterial extends Material {
    constructor() {
        super('simpleTexture');

        this.currentTexture = null;
    }

    setShader(s) {
        super.setShader(s);
        s.use();
        s.sendInt('tex', 0);
    }

    getShaderParameters() {
        return {
            enableUV: true,
            fragCode: `
                uniform sampler2D tex;
            `,
            fragMainCode: `
                ${ShaderBuilder.COLOR} = texture2D(tex, ${ShaderBuilder.V_UV});
            `,
        }
    }

    setTexture(texture) {
        this.currentTexture = texture;
    }

    use() {
        this.currentTexture.use(0);
    }
}

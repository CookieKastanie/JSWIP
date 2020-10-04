import { Material } from "./Material";
import { ShaderBuilder } from "./ShaderBuilder";

export class SpriteMaterial extends Material {
    constructor() {
        super('sprite');

        this.currentTexture = null;
        this.xScale = 1;
        this.xOffset = 0;
    }

    setShader(s) {
        super.setShader(s);
        s.use();
        s.sendInt('tex', 0);
    }

    getShaderParameters() {
        return {
            enableUV: true,
            vertCode: `
                uniform float xScale;
                uniform float xOffset;
            `,
            vertMainCode: `
                ${ShaderBuilder.V_UV}.x *= xScale;
                ${ShaderBuilder.V_UV}.x += xOffset;
            `,
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

    setXScale(s) {
        this.xScale = s;
    }

    setXOffset(v) {
        this.xOffset = v;
    }

    use() {
        this.currentTexture.use(0);
        this.shader.sendFloat('xScale', this.xScale);
        this.shader.sendFloat('xOffset', this.xOffset);
    }
}

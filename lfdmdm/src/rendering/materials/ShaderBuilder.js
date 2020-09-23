import { GLSLParser } from "akila/utils";
import { Shader } from "akila/webgl";

export class ShaderBuilder {
    constructor() {
        this.glslParser = new GLSLParser();
    }

    build(p = {
        enableUV: false,
        enableColor: false,
        enableWorldPosition: true,

        vertCode: '',
        vertMainCode: '',
        vertOverwriteMain: '',

        fragCode: '',
        fragMainCode: '',
        fragOverwriteMain: '',
    }, name) {
        p.enableWorldPosition = p.enableWorldPosition === undefined ? true : p.enableWorldPosition;

        const source = `
        ${GLSLParser.VERT_START}

        attribute vec2 ${ShaderBuilder.A_POSITION};
        ${p.enableUV ? `attribute vec2 ${ShaderBuilder.A_UV}; varying vec2 ${ShaderBuilder.V_UV};` : ''}
        ${p.enableColor ? `attribute vec3 ${ShaderBuilder.A_COLOR}; varying vec3 ${ShaderBuilder.V_COLOR};` : ''}

        uniform mat4 ${ShaderBuilder.U_MODEL};
        uniform mat4 ${ShaderBuilder.U_VP};

        ${p.vertCode ? p.vertCode : ''}

        ${p.vertOverwriteMain ? p.vertOverwriteMain : `
        void main() {
            ${p.enableUV ? `${ShaderBuilder.V_UV} = ${ShaderBuilder.A_UV};` : ''}
            ${p.enableColor ? `${ShaderBuilder.V_COLOR} = ${ShaderBuilder.A_COLOR};` : ''}

            vec4 ${ShaderBuilder.POSITION} = vec4(0.0, 0.0, 0.0, 1.0);

            ${p.enableWorldPosition ? `
            vec4 ${ShaderBuilder.WORLD_POSITION} = ${ShaderBuilder.U_VP} * ${ShaderBuilder.U_MODEL} * vec4(${ShaderBuilder.A_POSITION}, 0.0, 1.0);
            ${ShaderBuilder.POSITION} = ${ShaderBuilder.WORLD_POSITION};
            ` : ''}

            ${p.vertMainCode ? p.vertMainCode : ''}

            gl_Position = ${ShaderBuilder.POSITION};
        }
        `}


        ${GLSLParser.FRAG_START}
        ${p.enableUV ? `varying vec2 ${ShaderBuilder.V_UV};` : ''}
        ${p.enableColor ? `varying vec3 ${ShaderBuilder.V_COLOR};` : ''}

        ${p.fragCode ? p.fragCode : ''}

        ${p.fragOverwriteMain ? p.fragOverwriteMain : `
        void main() {
            vec4 ${ShaderBuilder.COLOR} = vec4(1.0);

            ${p.fragMainCode ? p.fragMainCode : ''}

            gl_FragColor = ${ShaderBuilder.COLOR};
        }
        `}
        `;

        const {vertex, fragment} = this.glslParser.getPrograms(source);
        console.log(`Shaders générés (${name}):`, vertex, fragment);
        return new Shader(vertex, fragment, name);
    }
}


ShaderBuilder.A_POSITION = 'a_position';
ShaderBuilder.A_UV = 'a_uv';
ShaderBuilder.A_COLOR = 'a_color';

ShaderBuilder.V_UV = 'v_uv';
ShaderBuilder.V_COLOR = 'v_color';

ShaderBuilder.U_MODEL = 'u_model';
ShaderBuilder.U_VIEW = 'u_view';
ShaderBuilder.U_PROJECTION = 'u_projection';
ShaderBuilder.U_VP = 'u_VP';

ShaderBuilder.WORLD_POSITION = 'sb_worldPosition';
ShaderBuilder.POSITION = 'sb_position';
ShaderBuilder.COLOR = 'sb_color';


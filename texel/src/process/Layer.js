import { Time } from "akila/time";
import { FrameBuffer } from "akila/webgl";
import { Editor } from "../editor/Editor";
import { Mesh } from "./Mesh";
import { Process } from "./Process";
import { ShaderLayer } from "./ShaderLayer";

export class Layer {
    constructor(unit) {
        if(unit == 0) this.savedFragment = `vec4 color(vec2 uv) {\n\treturn vec4(uv, 0.0, 1.0);\n}`;
        else this.savedFragment = `vec4 color(vec2 uv) {\n\treturn vec4(0.0, 0.0, 0.0, 1.0);\n}`;

        this.shader = new ShaderLayer(this.savedFragment);
        this.framebuffer = new FrameBuffer(600, 600, {
            texColor: true, texColorUnit: unit,
            depthTest: false,
        });

        this.shaderIsValid = true;
        this.needUpdate = false;
        this.updateAt = 0;
        this.realTime = false;
    }

    bind() {
        Editor.onchange(() => {
            this.updateAt = Time.now + Layer.changeDelta;
            this.needUpdate = true;
        });
        Editor.setValue(this.savedFragment);
        this.needRender = true;
    }

    getFrameBuffer() {
        return this.framebuffer;
    }

    isRealTime() {
        return this.realTime;
    }

    updateFragment() {
        this.savedFragment = Editor.getValue();
        this.shaderIsValid = this.shader.updateFragment(this.savedFragment);
        if(this.shaderIsValid) {
            this.realTime = this.shader.getUniformLocation('time') != undefined;

            if(!this.realTime) {
                const flags = this.shader.getUniformFlags().buffers;
                for(let i = 0; i < Process.layerNumber; ++i) {
                    if(Process.layers[i].isRealTime() && flags[i]) {
                        this.realTime = true;
                        break;
                    }
                }
            }

            Editor.displayNoError();
        }
        else Editor.displayError(this.shader.getCurrentError());
        this.needUpdate = false;
    }

    update() {
        if(this.needUpdate && Time.now > this.updateAt) {
            this.updateFragment();
            this.needRender = true;
        }
    }

    draw(isSelected) {
        if(this.needRender || (this.shaderIsValid && this.realTime)) {
            this.needRender = false;
            this.shader.use();
            this.framebuffer.use();
            this.shader.sendFloat('time', Time.now);

            const i = this.framebuffer.getTexture().getUnit();
            for(let j = 0; j < Process.layerNumber; ++j) {
                const b = this.shader.getUniformFlags().buffers[j];
                if(b) {
                    if(i == j) Process.debbugTexture.use(j);
                    else Process.layers[j].getFrameBuffer().getTexture().use(j);
                }
            }

            Mesh.quad.draw();

            if(isSelected) this.framebuffer.blitToScreen(FrameBuffer.NEAREST);
        }
    }
}

Layer.changeDelta = 0.5;

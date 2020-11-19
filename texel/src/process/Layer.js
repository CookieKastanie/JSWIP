import { Time } from "akila/time";
import { FrameBuffer } from "akila/webgl";
import { Editor } from "../editor/Editor";
import { Mesh } from "./Mesh";
import { Process } from "./Process";
import { ShaderLayer } from "./ShaderLayer";

export class Layer {
    constructor(unit) {
        if(unit == 0) this.savedFragment = `vec4 color(vec2 uv) {\n\treturn vec4(uv, 0.0, 1.0);\n}\n`;
        else this.savedFragment = `vec4 color(vec2 uv) {\n\treturn vec4(0.0, 0.0, 0.0, 1.0);\n}\n`;

        this.shader = new ShaderLayer(this.savedFragment);
        this.framebuffer = new FrameBuffer(600, 600, {
            texColor: true, texColorUnit: unit,
            depthTest: false,
        });

        this.shaderIsValid = true;
        this.needUpdate = false;
        this.updateAt = 0;
        this.realTime = false;
        this.needRender = true;

        this.unit = unit;

        this.vec2Buffer = new Float32Array([0, 0]);
    }

    bind() {
        Editor.onchange(() => {
            this.updateAt = Time.now + Layer.changeDelta;
            this.needUpdate = true;
        });
        Editor.setValue(this.savedFragment);
        this.needRender = true;
    }

    forceRender() {
        this.needRender = true;
    }

    getFrameBuffer() {
        return this.framebuffer;
    }

    getSavedFragment() {
        return this.savedFragment;
    }

    setSavedFragment(frag) {
        this.savedFragment = frag;
    }

    isRealTime() {
        return this.realTime;
    }

    getWidth() {
        return this.getFrameBuffer().getTexture().getWidth();
    }

    getHeight() {
        return this.getFrameBuffer().getTexture().getHeight();
    }

    setSize(width, height) {
        this.getFrameBuffer().setSize(width, height);
        this.forceRender();
    }

    updateFragment() {
        this.savedFragment = Editor.getValue();
        this.shaderIsValid = this.shader.updateFragment(this.savedFragment);
        if(this.shaderIsValid) {
            this.realTime = this.shader.getUniformFlags().time;

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
            this.framebuffer.clear();
            this.shader.sendFloat('time', Time.now);

            if(this.shader.getUniformFlags().currentBuffer) {
                const texture = this.getFrameBuffer().getTexture();
                this.vec2Buffer[0] = texture.getWidth();
                this.vec2Buffer[1] = texture.getHeight();
                this.shader.sendVec2(`currentBuffer.size`, this.vec2Buffer);
                this.shader.sendFloat(`currentBuffer.ratio`, texture.getWidth() / texture.getHeight());
            }

            for(let i = 0; i < Process.layerNumber; ++i) {
                const b = this.shader.getUniformFlags().buffers[i];
                if(b) {
                    const texture = Process.layers[i].getFrameBuffer().getTexture();
                    if(this.unit != i) texture.use();
                    else {
                        Process.debbugTexture.setUnit(i);
                        Process.debbugTexture.use();
                    }

                    this.vec2Buffer[0] = texture.getWidth();
                    this.vec2Buffer[1] = texture.getHeight();
                    this.shader.sendVec2(`buffer${Layer.ALPHABET[i]}.size`, this.vec2Buffer);
                    this.shader.sendFloat(`buffer${Layer.ALPHABET[i]}.ratio`, texture.getWidth() / texture.getHeight());
                }
            }

            for(let i = 0; i < Process.textureNumber; ++i) {
                const b = this.shader.getUniformFlags().textures[i];
                if(b) {
                    const texture = Process.textures[i];
                    texture.use();
                    this.vec2Buffer[0] = texture.getWidth();
                    this.vec2Buffer[1] = texture.getHeight();
                    this.shader.sendVec2(`tex${Layer.ALPHABET[i]}.size`, this.vec2Buffer);
                    this.shader.sendFloat(`tex${Layer.ALPHABET[i]}.ratio`, texture.getWidth() / texture.getHeight());
                }
            }

            Mesh.quad.draw();

            if(isSelected) this.framebuffer.blitToScreen(FrameBuffer.NEAREST);
        }
    }
}

Layer.changeDelta = 0.5;
Layer.ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F'];

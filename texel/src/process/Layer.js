import { Time } from "akila/time";
import { FrameBuffer } from "akila/webgl";
import { Editor } from "../editor/Editor";
import { Mesh } from "./Mesh";
import { ShaderLayer } from "./ShaderLayer";

export class Layer {
    constructor() {
        this.savedFragment = `vec4 color(vec2 uv) {\n\treturn vec4(uv, 0.0, 1.0);\n}`;
        this.shader = new ShaderLayer(this.savedFragment);
        this.framebuffer = new FrameBuffer(600, 600, {
            texColor: true,
            depthTest: false,
        });
        this.shaderIsValid = true;
        this.needUpdate = true;
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

    unbind() {
        this.savedFragment = Editor.getValue();
    }

    updateFragment() {
        this.savedFragment = Editor.getValue();
        this.shaderIsValid = this.shader.updateFragment(this.savedFragment);
        if(this.shaderIsValid) {
            this.realTime = this.shader.getUniformLocation('time') != undefined;
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
            Mesh.quad.draw();

            if(isSelected) this.framebuffer.blitToScreen(FrameBuffer.NEAREST);
        }
    }
}

Layer.changeDelta = 0.5;

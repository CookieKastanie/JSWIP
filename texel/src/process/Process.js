import { Display, Texture } from "akila/webgl";
import { Layer } from "./Layer";
import { Mesh } from "./Mesh";
import { UI } from "../editor/UI";
import { Editor } from "../editor/Editor";

export class Process {
    static init() {
        UI.init();

        Process.display = new Display(600, 600, {webGLVersion: 2, antialias: false});
        Process.display.disable(Display.DEPTH_TEST);
        Process.display.setClearColor(0.0, 0.0, 0.0, 1.0);
        Process.display.clear();

        Process.debbugTexture = new Texture(null, 1, 1);

        Mesh.init();

        Process.layers = new Array();
        for(let i = 0; i < Process.layerNumber; ++i) {
            Process.layers.push(new Layer(i));
        }

        Process.textures = new Array();
        for(let i = 0; i < Process.textureNumber; ++i) {
            Process.textures.push(new Texture(null, 1, 1).setUnit(i + Process.layerNumber));
        }

        Process.newTextureData = new Array();

        Process.selectLayer(0);
        UI.createMenus();

        Process.loadLocalStorage();
    }

    static selectLayer(n) {
        n = Math.max(Math.min(Process.layerNumber - 1, n), 0);
        Process.selectedLayerIndex = n;
        Process.selectedLayer = Process.layers[n];

        Process.display.useDefaultFrameBuffer();
        Process.display.setSize(
            Process.selectedLayer.getFrameBuffer().getTexture().getWidth(),
            Process.selectedLayer.getFrameBuffer().getTexture().getHeight()
        );

        Process.selectedLayer.bind();
    }

    static getSelectedLayer() {
        return Process.selectedLayer;
    }

    static setSelectedLayerSize(width, height) {
        Process.selectedLayer.setSize(width, height);
        Process.display.setSize(width, height);
    }

    static updateTexture(index, img) {
        Process.textures[index].setTextureData(img);

        for(let i = 0; i < Process.layerNumber; ++i) {
            const b = Process.layers[i].shader.getUniformFlags().textures[index];
            if(b) Process.layers[i].forceRender();
        }
    }

    static update() {
        for(const l of Process.layers) l.update();
    }

    static draw() {
        for(let i = 0; i < Process.layerNumber; ++i) {
            Process.layers[i].draw(Process.selectedLayerIndex == i);
        }
    }

    static serializePrograms() {
        let str = '';

        for(let i = 0; i < Process.layerNumber; ++i) {
            const frag = Process.layers[i].getSavedFragment();

            str += `${frag}@start_end@`;
        }

        return str;
    }

    static unserializePrograms(textFile) {
        const frags = textFile.split('@start_end@');
        for(let i = 0; i < Math.min(frags.length, Process.layerNumber); ++i) {
            const frag = frags[i];
            if(frag != '') {
                Process.layers[i].setSavedFragment(frag);
                if(i == Process.selectedLayerIndex) Editor.setValue(frag);
            }
        }
    }

    static saveToLocalStorage() {
        const value = Process.serializePrograms();
        localStorage.setItem('last_session', value);
    }

    static loadLocalStorage() {
        const textFile = localStorage.getItem('last_session');
        if(typeof textFile == 'string') {
            Process.unserializePrograms(textFile);
        }
    }
}

Process.layerNumber = 4;
Process.textureNumber = 6;
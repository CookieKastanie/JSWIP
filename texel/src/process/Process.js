import { Display, Texture } from "akila/webgl";
import { Layer } from "./Layer";
import { Mesh } from "./Mesh";
import { UI } from "../editor/UI";

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

        Process.selectLayer(0);
        UI.createMenus();
    }

    static selectLayer(n) {
        n = Math.max(Math.min(Process.layerNumber - 1, n), 0);
        Process.selectedLayerIndex = n;
        Process.selectedLayer = Process.layers[n];
        Process.selectedLayer.bind();
    }

    static update() {
        for(const l of Process.layers) l.update();
    }

    static draw() {
        for(let i = 0; i < Process.layerNumber; ++i) {
            Process.layers[i].draw(Process.selectedLayerIndex == i);
        }
    }
}

Process.layerNumber = 4;

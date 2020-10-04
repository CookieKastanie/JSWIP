import { Display } from "akila/webgl";
import { Editor } from "../editor/Editor";
import split from '../libs/split/split';
import { Text } from "../lang/Text";
import { Layer } from "./Layer";
import { Mesh } from "./Mesh";

export class Process {
    static init() {
        Text.init();
        Editor.init(document.getElementById('code-inject'));
        split(['#result-panel', '#code-panel'], {sizes: [67, 33]});

        Process.display = new Display(600, 600, {webGLVersion: 2, antialias: false});
        Process.display.disable(Display.DEPTH_TEST);
        Process.display.setClearColor(0.0, 0.0, 0.0, 1.0);
        Process.display.clear();

        Mesh.init();

        Process.layers = new Array();

        for(let i = 0; i < Process.layerNumber; ++i) {
            Process.layers.push(new Layer());
        }

        Process.selectLayer(0);
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

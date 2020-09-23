import { Bank, Parser } from "akila/utils";
import { Texture, VAO, VBO } from "akila/webgl";
import { MaterialsManager } from "./rendering/materials/MaterialsManager";
import { SimpleTextureMaterial } from "./rendering/materials/SimpleTextureMaterial";
import { MeshsManager } from "./rendering/meshs/MeshsManager";
import { TexturesManager } from "./rendering/textures/TexturesManager";

export class Loader {
    static async loadAll() {
        await Loader.loadTextures();
        await Loader.loadMeshs();
        await Loader.loadMaterials();
    }

    static async loadTextures() {
        const textures = new Bank('./textures', ['idle_1', 'walk_2', 'crate_1', 'bush_1', 'coin_4', 'paper-gray', 'paper-grid'], {extension: 'png', mediaType: Bank.IMAGE, treatment: (file, name) => {
            TexturesManager.registerTexture(new Texture(file), name);
            return null;
        }});
        await textures.load(prog => { console.log(`Chargement : ${prog}%`); });
    }

    static async loadMaterials() {
        MaterialsManager.registerMaterial(new SimpleTextureMaterial());
    }

    static async loadMeshs() {
        const meshs = new Bank('./meshs', ['terrain_map1'], {extension: 'obj', treatment: (file, name) => {
            //Parser.kbm()
            return null;
        }});
        await meshs.load(prog => { console.log(`Chargement : ${prog}%`); });


        const uvQuad = new VAO()
        .addVBO(new VBO([
            -1,1, 1,-1, 1,1,
            -1,1, -1,-1, 1,-1
        ], 2, 0))
        .addVBO(new VBO([
            0,0, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1
        ], 2, 1));
        

        MeshsManager.registerMesh(uvQuad, 'uvQuad');
    }
}

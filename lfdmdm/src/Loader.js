import { Bank, Parser } from "akila/utils";
import { BroadField2d, Collider2d, RayRaster2d } from "akila/collision";
import { Texture, VAO, VBO } from "akila/webgl";
import { LoadingMaterial } from "./rendering/materials/LoadingMaterial";
import { MaterialsManager } from "./rendering/materials/MaterialsManager";
import { SimpleTextureMaterial } from "./rendering/materials/SimpleTextureMaterial";
import { SpriteMaterial } from "./rendering/materials/SpriteMaterial";
import { MeshsManager } from "./rendering/meshs/MeshsManager";
import { TexturesManager } from "./rendering/textures/TexturesManager";
import { HBParser } from "./collision/HBParser";
import { HitboxesManager } from "./collision/HitboxesManager";

export class Loader {
    static async preload() {
        const textures = new Bank('./textures', ['loading_arrow'], {extension: 'png', mediaType: Bank.IMAGE, treatment: (file, name) => {
            TexturesManager.registerTexture(new Texture(file), name);
            return null;
        }});
        await textures.load();
    }

    static async loadTextures() {
        const textures = new Bank('./textures', ['crate_1', 'bush_1', 'coin_4', 'paper-gray', 'paper-grid'], {extension: 'png', mediaType: Bank.IMAGE, treatment: (file, name) => {
            const tex = new Texture(file);
            tex.setParameters({wrapS: Texture.REPEAT, wrapT: Texture.REPEAT});
            TexturesManager.registerTexture(tex, name);
            return null;
        }});
        await textures.load(prog => { console.log(`Chargement : ${prog}%`); });

        const textures2 = new Bank('./textures', ['idle_1', 'walk_2'], {extension: 'png', mediaType: Bank.IMAGE, treatment: (file, name) => {
            const tex = new Texture(file);
            tex.setParameters({wrapS: Texture.MIRRORED_REPEAT, wrapT: Texture.MIRRORED_REPEAT});
            TexturesManager.registerTexture(tex, name);
            return null;
        }});
        await textures2.load(prog => { console.log(`Chargement : ${prog}%`); });
    }

    static loadMaterials() {
        MaterialsManager.registerMaterial(new LoadingMaterial());
        MaterialsManager.registerMaterial(new SimpleTextureMaterial());
        MaterialsManager.registerMaterial(new SpriteMaterial());
    }

    static async loadMeshs() {
        const meshs = new Bank('./meshs', ['terrain_map1', 'terrain_ground_map1'], {extension: 'obj', treatment: (file, name) => {
            const o = Parser.obj(file);
            const vao = new VAO().addVBO(new VBO(o.vertex, 3, 0)).addVBO(new VBO(o.uv, 2, 1));
            MeshsManager.registerMesh(vao, name);

            return null;
        }});
        await meshs.load(prog => { console.log(`Chargement : ${prog}%`); });


        const uvQuad = new VAO()
        .addVBO(new VBO([
            -1,1,1,    1,-1,0,    1,1,1,
            -1,1,1,    -1,-1,0,    1,-1,0
        ], 3, 0))
        .addVBO(new VBO([
            0,0, 1, 1, 1, 0,
            0, 0, 0, 1, 1, 1
        ], 2, 1));
        
        MeshsManager.registerMesh(uvQuad, 'uvQuad');
    }

    static async loadHitboxes() {
        const hbs = new Bank('meshs', ['terrain_hitbox_map1'], {extension: 'obj', treatment: (file, name) => {
            const br = new BroadField2d();
    
            const edges = HBParser.getEdges(file);
            for(const e of edges) {
                const h = new Collider2d(e);
                RayRaster2d.addToField(e[0], e[1], e[2], e[3], br, h);
            }

            HitboxesManager.registerHitbox(br, name);
            return null;
        }});
        await hbs.load(prog => { console.log(`Chargement : ${prog}%`); });

        const hbs2 = new Bank('meshs', ['player_hitbox'], {extension: 'obj', treatment: (file, name) => {   
            const edges = HBParser.getLoop(file);
            const h = new Collider2d(edges);

            HitboxesManager.registerHitbox(h, name);
            return null;
        }});
        await hbs2.load(prog => { console.log(`Chargement : ${prog}%`); });
    }
}

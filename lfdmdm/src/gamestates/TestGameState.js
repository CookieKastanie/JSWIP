import { SAT2d } from "akila/collision";
import { Keyboard } from "akila/inputs/Keyboard";
import { Mouse } from "akila/inputs/Mouse";
import { mat4 } from "akila/math";
import { Time } from "akila/time/Time";
import { HitboxesManager } from "../collision/HitboxesManager";
import { Camera } from "../common/Camera";
import { HackCamera } from "../common/HackCamera";
import { Character } from "../entities/Character";
import { Coin } from "../entities/Coin";
import { Player } from "../entities/Player";
import { MeshsManager } from "../rendering/meshs/MeshsManager";
import { RE } from "../rendering/RE";
import { TexturesManager } from "../rendering/textures/TexturesManager";
import { GameState } from "./GameState";

export class TestGameState extends GameState {
    constructor() {
        super();

        this.mouse = new Mouse();

        this.camera = new Camera();

        this.player = new Player();

        this.coin = new Coin();

        this.boxes = new Array();

        window.o = {
            coin: this.coin,
            camHack: () => {
                this.camera = new HackCamera();
            },

            cam: () => {
                this.camera = new Camera();
            }
        }

        {
            const box1 = new Character();
            box1.setTexture(TexturesManager.getTextureByName('crate_1'));
            box1.getTransform().setPosition([2, -10, 0]);
            this.boxes.push(box1);

            const box2 = new Character();
            box2.setTexture(TexturesManager.getTextureByName('crate_1'));
            box2.getTransform().setPosition([-5, -8, 0]);
            this.boxes.push(box2);

            const box3 = new Character();
            box3.setTexture(TexturesManager.getTextureByName('crate_1'));
            box3.getTransform().setPosition([0, -5, 0]);
            this.boxes.push(box3);
        }

        this.t1 = MeshsManager.getMeshsByName('terrain_map1');
        this.t2 = MeshsManager.getMeshsByName('terrain_ground_map1');

        this.mapCollider = HitboxesManager.getHitboxByName('terrain_hitbox_map1');
        SAT2d.setMatMode(SAT2d.MAT4XY);
    }

    updateLogic() {
        this.player.update();
    }

    updateAnimations() {
        this.player.updateAnimation();
        this.coin.updateAnimation();
    }

    updateCollisions() {
        const fieldBuffer = new Set();
        const satResponse = SAT2d.createResultBuffer();

        const p = this.player.getTransform().getPosition();

        const r = 2;
        for(let x = p[0] - r; x < p[0] + r; ++x) {
            for(let y = p[1] - r; y < p[1] + r; ++y) {
                this.mapCollider.query(x, y, fieldBuffer);
            }
        }

        for(const collider of fieldBuffer) {
            SAT2d.getMin(this.player.getHitbox(), this.player.getTransform().toMat4(), collider, mat4.create(), satResponse);

            if(satResponse.length != 0) {
                this.player.getTransform().translate([satResponse.axis[0] * satResponse.length, satResponse.axis[1] * satResponse.length, 0]);
            }
        }
    }

    render() {
        this.camera.setPosition(this.player.getTransform().getPosition());

        RE.prepare();
        RE.setCamera(this.camera);
        RE.renderEntity(this.player);

        RE.renderEntity(this.coin);


        for(const box of this.boxes) RE.renderEntity(box);


        this.boxes[0].material.setTexture(TexturesManager.getTextureByName('paper-grid'));
        RE.renderModel(this.t1, this.boxes[0].material);
        this.boxes[0].material.setTexture(TexturesManager.getTextureByName('paper-gray'));
        RE.renderModel(this.t2, this.boxes[0].material);


        RE.finish();
    }
}

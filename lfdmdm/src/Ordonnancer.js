import { HitboxesManager } from "./collision/HitboxesManager";
import { MaterialsManager } from "./rendering/materials/MaterialsManager";
import { MeshsManager } from "./rendering/meshs/MeshsManager";
import { RE } from "./rendering/RE";
import { TexturesManager } from "./rendering/textures/TexturesManager";

export class Ordonnancer {
    static init() {
        RE.init();

        MeshsManager.init();
        HitboxesManager.init();
        MaterialsManager.init();
        TexturesManager.init();
    }

    static setGameState(gameState) {
        if(Ordonnancer.currentGameSate) Ordonnancer.currentGameSate.onDestroy();
        Ordonnancer.currentGameSate = gameState;
        gameState.onCreate();
    }

    static tick() {
        Ordonnancer.currentGameSate.updateLogic();
        Ordonnancer.currentGameSate.updateCollisions();
    }

    static draw() {
        Ordonnancer.currentGameSate.updateAnimations();
        Ordonnancer.currentGameSate.render();
    }
}

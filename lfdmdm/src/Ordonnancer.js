import { Loader } from "./Loader";
import { MaterialsManager } from "./rendering/materials/MaterialsManager";
import { MeshsManager } from "./rendering/meshs/MeshsManager";
import { RE } from "./rendering/RE";
import { TexturesManager } from "./rendering/textures/TexturesManager";

export class Ordonnancer {
    static async init() {
        RE.init();

        MeshsManager.init();
        MaterialsManager.init();
        TexturesManager.init();

        await Loader.loadAll();
    }

    static setGameState(gameState) {
        if(Ordonnancer.currentGameSate) Ordonnancer.currentGameSate.onDestroy();
        Ordonnancer.currentGameSate = gameState;
        gameState.onCreate();
    }

    static tick() {
        Ordonnancer.currentGameSate.updateLogic();
        Ordonnancer.currentGameSate.updateCollisions();
        Ordonnancer.currentGameSate.updateAnimations();
    }

    static draw() {
        Ordonnancer.currentGameSate.render();
    }
}

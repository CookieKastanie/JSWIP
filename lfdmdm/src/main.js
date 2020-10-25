import { Eagle } from 'Akila/utils';
import { Time } from 'Akila/time';
import { TestGameState } from './gamestates/TestGameState';
import { LoadingGameState } from './gamestates/LoadingGameState';
import { Ordonnancer } from './Ordonnancer';
import { Loader } from './Loader';

console.log(Eagle.getString());

const sleep = ms => {
    return new Promise(r => setTimeout(r, ms));
}

const time = new Time();
time.onInit(async () => {
    Ordonnancer.init();

    await Loader.preload();
    Loader.loadMaterials();

    Ordonnancer.setGameState(new LoadingGameState());

    Promise.all([Loader.loadTextures(), Loader.loadMeshs(), Loader.loadHitboxes(), sleep(2000)]).then(() => {
        Ordonnancer.setGameState(new TestGameState());
    });
});
time.onTick(Ordonnancer.tick);
time.onDraw(Ordonnancer.draw);
time.start();

document.addEventListener('visibilitychange', () => {
    if(document.visibilityState != 'visible') {
        console.log('PAUSE');
        time.pause();
    } else {
        console.log('RESUME');
        time.play();
    }
});

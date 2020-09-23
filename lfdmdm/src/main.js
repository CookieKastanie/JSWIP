import { Eagle } from 'Akila/utils';
import { Time } from 'Akila/time';
import { TestGameState } from './gamestates/TestGameState';
import { Ordonnancer } from './Ordonnancer';

console.log(Eagle.getString());

const time = new Time();
time.onInit(async () => {
    await Ordonnancer.init();
    Ordonnancer.setGameState(new TestGameState());
});
time.onTick(Ordonnancer.tick);
time.onDraw(Ordonnancer.draw);
time.start();

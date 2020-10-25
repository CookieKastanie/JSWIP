import { Time } from 'Akila/time';
import { Display, Texture } from 'Akila/webgl';
import { MainMixer, Sample } from 'Akila/audio';
import { BroadField2d, RayRaster2d } from 'Akila/collision';
import { Bank } from 'Akila/utils';

import { Game } from './Game';
import { Player } from './Player';
import { Sprite } from './Sprite';

import { MasterRenderer } from './MasterRenderer';

const time = new Time();
const display = new Display(700, 700);
//display.setClearColor(0.2, 0.4, 0.4, 1.0);
display.setClearColor(0.0, 0.0, 0.0, 1.0);

const mainMixer = new MainMixer(false);
mainMixer.setVolume(0.45);

const game = new Game();
let masterRenderer;

time.onInit(async () => {
    const banks = {};

    banks.textures = new Bank('./textures', ['frisk_face', 'frisk_back', 'frisk_left', 'frisk_right', 'house_coridor', 'house_hall', 'house_kitchen', 'house_living_room'], {extension: 'png', mediaType: 'image', treatment: (file, name) => {
        const texture = new Texture(file)
        .setParameters({
            wrapT: Texture.CLAMP_TO_EDGE,
            wrapS: Texture.CLAMP_TO_EDGE,
            magFilter: Texture.NEAREST,
            minFilter: Texture.NEAREST
        });
        return texture;
    }});
    await banks.textures.load(prog => { console.log(`Chargement : ${prog}%`); });

    banks.sons = new Bank('./sons', ['undertale'], {extension: 'mp3', mediaType: 'arrayBuffer', treatment: (file) => {
        const s = new Sample();
        return s.loadData(file);
    }});
    await banks.sons.load(prog => { console.log(`Chargement : ${prog}%`); });



    banks.map = new Bank('./map', ['main', 'rooms'], {extension: 'hitmap', mediaType: 'text', treatment: (file) => {
        const field = new BroadField2d();

        const rects = new Array();
        const lines = file.split('\n');

        let id = 0;
        
        for(let l of lines) {
            const t = l.split(' ');
            if(t.length == 4) {
                const x0 = parseFloat(t[0]);
                const y0 = parseFloat(t[1]);
                const x1 = parseFloat(t[2]);
                const y1 = parseFloat(t[3]);

                rects.push({
                    x0, y0, x1, y1, id: id++
                });
            }
        }

        for(let r of rects) {
            const s = 67;
            //RayRaster2d.addToField(r.x0 / 160, r.y0 / 160, r.x1 / 160, r.y1 / 160, field, r);
            RayRaster2d.addToField(r.x0 / s, r.y0 / s, r.x1 / s, r.y0 / s, field, r);
            RayRaster2d.addToField(r.x1 / s, r.y0 / s, r.x1 / s, r.y1 / s, field, r);
            RayRaster2d.addToField(r.x1 / s, r.y1 / s, r.x0 / s, r.y1 / s, field, r);
            RayRaster2d.addToField(r.x0 / s, r.y1 / s, r.x0 / s, r.y0 / s, field, r);
        }

        return field;
    }});
    await banks.map.load(prog => { console.log(`Chargement : ${prog}%`); });

    game.field = banks.map.get('main');
    game.roomsField = banks.map.get('rooms');

    banks.shaders = new Bank('./shaders', ['main.vs', 'main.fs', 'player.vs', 'player.fs', 'hit.vs', 'hit.fs', 'room.vs', 'room.fs']);
    await banks.shaders.load(prog => { console.log(`Chargement : ${prog}%`); });

    game.player = new Player(474, 60, [
        new Sprite(banks.textures.get('frisk_back'), 4),
        new Sprite(banks.textures.get('frisk_face'), 4),
        new Sprite(banks.textures.get('frisk_left'), 2),
        new Sprite(banks.textures.get('frisk_right'), 2),
    ]);

    game.roomDatas = [
        {
            camMaxX: 105,
            camMinX: 105,
            camMaxY: 295,
            camMinY: 295,
            texture: banks.textures.get('house_kitchen')
        }, 
        {
            camMaxX: 165,
            camMinX: 165,
            camMaxY: 100,
            camMinY: 100,
            texture: banks.textures.get('house_living_room')
        },
        {
            camMaxX: 478,
            camMinX: 478,
            camMaxY: 100,
            camMinY: 100,
            texture: banks.textures.get('house_hall')
        },
        {
            camMaxX: 1260,
            camMinX: 760,
            camMaxY: 80,
            camMinY: 80,
            texture: banks.textures.get('house_coridor')
        }
    ]

    for(let r of game.roomsField.query(476 / 67, 1 / 67)) {
        game.currentRoom = game.roomDatas[r.id];
        game.currentRoom.bounds = r;
    }
    

    banks.sons.get('undertale').play(0, true);

    masterRenderer = new MasterRenderer(display, banks.shaders);


    display.disable(Display.CULL_FACE);
    display.disable(Display.DEPTH_TEST);
});

time.onTick(() => {
    game.update();
});
/*
time.onDraw(() => {
    //display.clear();
    masterRenderer.render(game);
});
*/

mainMixer.askPermission().then(() => {
    time.onDraw(() => {
        //display.clear();
        masterRenderer.render(game);
    });

    time.play();
});


time.start();

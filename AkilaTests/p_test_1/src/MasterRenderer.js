import { Matrix4 } from 'Akila/utils';
import { Shader, FrameBuffer, VAO, VBO } from 'Akila/webgl';
import { Time } from 'Akila/time';
import { PlayerRenderer } from './Player';

export class MasterRenderer {
    constructor(display, shaders) {
        this.display = display;
        this.frameBuffer = new FrameBuffer(this.display.getWidth(), this.display.getHeight());
        this.roomShader = new Shader(shaders.get('room.vs'), shaders.get('room.fs'));
        this.mainShader = new Shader(shaders.get('main.vs'), shaders.get('main.fs'));
        this.mainShader.use();
        this.mainShader.sendFloat('screenHeight', this.display.getHeight());




        this.hitShader = new Shader(shaders.get('hit.vs'), shaders.get('hit.fs'));




        this.screen = new VAO()
        .addVBO(new VBO([
            -1, -1,    1, 1,     -1, 1,
            -1, -1,    1, -1,     1, 1
        ], 2, 0));



        this.rectPoints = new VBO([0, 0,  0, 0,  0, 0,  0, 0], 2, 0).setUsage(VBO.DYNAMIC_DRAW);
        this.rect = new VAO()
        .setMode(VAO.LINE_LOOP)
        .addVBO(this.rectPoints);



        this.roomPoints = new VBO([0, 0,  0, 0,  0, 0,  0, 0], 2, 0).setUsage(VBO.DYNAMIC_DRAW);
        this.room = new VAO()
        .setMode(VAO.TRIANGLE_FAN)
        .addVBO(this.roomPoints)
        .addVBO(new VBO([0, 0,  1, 0,   1, 1,   0, 1], 2, 1)); //uv



        this.playerRenderer = new PlayerRenderer(shaders.get('player.vs'), shaders.get('player.fs'));

        this.cam = Matrix4.identity();

        this.cam[0] = 0.006;
        this.cam[5] = 0.006;
    }

    render(game) {
        /*this.cam[12] = -game.player.x * 0.01;
        this.cam[13] = -game.player.y * 0.01;*/

        let camX = game.player.x;
        let camY = game.player.y;

        camX = Math.min(Math.max(camX, game.currentRoom.camMinX), game.currentRoom.camMaxX);
        camY = Math.min(Math.max(camY, game.currentRoom.camMinY), game.currentRoom.camMaxY);

        this.cam[12] = -camX * 0.006;
        this.cam[13] = -camY * 0.006;


        this.frameBuffer.use();
        this.display.clear();


        {
            const r = game.currentRoom.bounds;
            this.roomShader.use();
            this.roomShader.sendMat4('camera', this.cam);
            this.roomPoints.setData(new Float32Array([
                r.x0, r.y0,
                r.x1, r.y0,
                r.x1, r.y1,
                r.x0, r.y1,
            ]));
            game.currentRoom.texture.use();
            this.room.draw();
        }


        this.playerRenderer.prepare(this.cam);
        this.playerRenderer.render(game.player);



/*
        this.hitShader.use();
        this.hitShader.sendMat4('camera', this.cam);
        

        for(let r of game.hitBuffer) {
            this.rectPoints.setData(new Float32Array([
                r.x0, r.y0,
                r.x1, r.y0,
                r.x1, r.y1,
                r.x0, r.y1,
            ]));

            this.rect.draw();
        }


        const r = game.player.getHitBox();
        this.rectPoints.setData(new Float32Array([
            r.x0, r.y0,
            r.x1, r.y0,
            r.x1, r.y1,
            r.x0, r.y1,
        ]));

        this.rect.draw();
*/

        this.display.useDefaultFrameBuffer();
        this.display.clear();
        this.mainShader.use();
        this.mainShader.sendFloat('iTime', Time.now);
        this.frameBuffer.getColorTexture().use();
        this.screen.draw();
    }
}

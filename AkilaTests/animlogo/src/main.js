import { Display, Shader, FrameBuffer, VAO, VBO, Texture} from 'Akila/kgl';
import { Bank, Matrix4 } from 'Akila/utils';
import { Time } from 'Akila/time';

const time = new Time();

let cam;

let display;
const banks = {};
const shaders = {};
const meshs = {};
const textures = {};
const frameBuffers = {};

const lightPos = [0.5, 0.5];

let render = false;

time.onInit(async () => {
    banks.textures = new Bank("./textures", ["logo"], {extension: "png", mediaType: "image"});
    await banks.textures.load(prog => { console.log(`Chargement : ${prog}%`); });

    banks.shaders = new Bank("./shaders", ["main.vs", "main.fs", "snoise3d.fs", "ray.fs", "sun.fs"]);
    await banks.shaders.load(prog => { console.log(`Chargement : ${prog}%`); });

    display = new Display(512, 512);
    //display = new Display(128, 128);
    //display = new Display(128, 128);

    display.disable(Display.DEPTH_TEST);
    display.disable(Display.CULL_FACE);

    shaders.main = new Shader(banks.shaders.get("main.vs"), banks.shaders.get("main.fs"), 'main');
    meshs.screen = new VAO()
    .addVBO(new VBO([
        -1,1,   1,1, 1,-1,
        -1,1, 1,-1, -1,-1
    ], 2, shaders.main.getAttribLocation("position")));

    textures.logo = new Texture(banks.textures.get("logo"));


    shaders.noise = new Shader(banks.shaders.get("main.vs"), banks.shaders.get("snoise3d.fs"), 'noise');
    frameBuffers.noise = new FrameBuffer(display.getWidth(), display.getHeight(), {texColor: true});

    shaders.ray = new Shader(banks.shaders.get("main.vs"), banks.shaders.get("ray.fs"), 'ray');

    shaders.sun = new Shader(banks.shaders.get("main.vs"), banks.shaders.get("sun.fs"), 'sun');

    if(render) start()
});

let dl = true;
let num = 0;

let delta = 0;


const frame =  () => {
    display.clear();
    display.defaultBlendFunc();


    lightPos[0] = Math.cos(delta) * 0.1 + 0.5;
    lightPos[1] = Math.sin(delta) * 0.1 + 0.5;

    //delta += Time.delta;

    delta += 0.05;

///////////////////////////////////////////////////////////////////////

    /*shaders.noise.use();
    frameBuffers.noise.use();

    textures.logo.use();
    shaders.noise.sendFloat("time", Time.now);
    meshs.screen.draw();*/

    shaders.sun.use();
    frameBuffers.noise.use();

    textures.logo.use();
    shaders.sun.sendVec2("lightPositionOnScreen", lightPos);
    shaders.sun.sendFloat("time", Time.now);
    meshs.screen.draw();

////////////////////////////////////////////////////////////////////


    shaders.main.use();
    display.useDefaultFrameBuffer();
    textures.logo.use();
    meshs.screen.draw();
    


    display.blendFunc(Display.ONE, Display.ONE);
    
    shaders.ray.use();
    shaders.ray.sendVec2("lightPositionOnScreen", lightPos);
    frameBuffers.noise.getTexture().use();
    meshs.screen.draw();

}

const start = () => {

    setInterval(() => {
        if(dl){
            frame();
            download(display.getCanvas(), `logo-${(num++).toString().padStart(3, '0')}.png`);
        
                if(delta > Math.PI * 2) {
                    dl = false;
                }

                console.log('frame')
        }
       
    }, 200)
}

if(!render) time.onDraw(frame);


time.start();

/*
function downloadFileFnc(text, fileName)
{
    var textCode = new Blob([text], { type: "image/png" });
    var dldLnkVar = document.createElement('a');
    dldLnkVar.href = window.URL.createObjectURL(textCode);
    dldLnkVar.setAttribute('download', fileName);
    dldLnkVar.click();
}
*/

function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }

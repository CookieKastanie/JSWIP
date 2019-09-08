import { Display, Shader, IndexedVAO, IBO, VBO, Texture, VAO } from 'Akila/kgl';
import { Bank, FirstPersonCamera, Matrix4, Parser } from 'Akila/utils';

//const W = 700, H = 580;
const W = window.innerWidth, H = window.innerHeight;
let display;
let mainShader, repereShader;
let repereVao;
let vao;
let skin;
let camera, worldPosition;

(async () => {
  const texs = new Bank("./textures", ["templet_fin", "cache"], {extension: "png", mediaType: "image"});
  await texs.load(prog => { console.log(`Chargement : ${prog}%`); });

  const meshs = new Bank("./meshs", ["head"], {extension: "obj", treatment: Parser.objNoIndices});
  await meshs.load(prog => { console.log(`Chargement : ${prog}%`); });

  const shaders = new Bank("./shaders", ["main.vs", "main.fs", "repere.vs", "repere.fs"]);
  await shaders.load(prog => { console.log(`Chargement : ${prog}%`); });

  display = new Display(W, H);
  display.disable(Display.CULL_FACE);

  display.setClearColor(0.8/2, 0.8/2, 1.0/2, 1.0);

  repereShader = new Shader(shaders.get("repere.vs"), shaders.get("repere.fs"));

  repereVao = new IndexedVAO()
  .setMode(VAO.LINES)
  .addVBO(new VBO([
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
  ], 3, repereShader.getAttribLocation("position")))
  .addVBO(new VBO([
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
  ], 3, repereShader.getAttribLocation("color")))
  .setIBO(new IBO([0, 1, 0, 2, 0, 3]));

  /////////////////////////////////////////////

  mainShader = new Shader(shaders.get("main.vs"), shaders.get("main.fs"));

  let m = meshs.get("head");
  vao = new VAO()
  .addVBO(new VBO(m.texcoords, 2, mainShader.getAttribLocation("texcoords")))
  .addVBO(new VBO(m.positions, 3, mainShader.getAttribLocation("position")));

  skin = new Texture(texs.get("templet_fin"))
  .setParameters({magFilter: Texture.NEAREST, wrapS: Texture.CLAMP_TO_EDGE, wrapT: Texture.CLAMP_TO_EDGE});

  camera = new FirstPersonCamera(W, H).setSpeed(0.05 * 10).setAcc(0.005 * 10);
  worldPosition = Matrix4.identity();

  draw();
})();

const draw = () => {
  display.clear();
  Matrix4.identity(worldPosition);

  let cam = camera.getMatrix();
  
  repereShader.use();
  repereShader.sendMat4("camera", cam);

  worldPosition[12] = 0;
  worldPosition[13] = 0;
  worldPosition[14] = 0;
  repereShader.sendMat4("worldPosition", worldPosition);
  repereVao.draw();

  ////////////////////////////////

  mainShader.use();
  mainShader.sendMat4("camera", cam);

  worldPosition[12] = 0;
  worldPosition[13] = 0;
  worldPosition[14] = -5;
  mainShader.sendMat4("worldPosition", worldPosition);
  skin.use();

  mainShader.sendInt("over", 0);
  vao.draw();

  mainShader.sendInt("over", 1);
  vao.draw();

  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////////

const corsUrl = `${window.location.protocol}//${window.location.hostname}:4000`;

window.loadSkin = pseudo => {
  fetch(corsUrl, {
    headers: {
      url: `https://api.minetools.eu/uuid/${pseudo}`
    }
  })
  .then(res => {
    return res.json();
  })
  .then(data => {

    if(data.id) {
      return fetch(corsUrl, {
        headers: {
          url: `https://api.minetools.eu/profile/${data.id}`
        }
      })
    }
  })
  .then(res => {
    return res.json();
  })
  .then(data => {
    if(data.decoded) {
      return fetch(corsUrl, {
        headers: {
          url: data.decoded.textures.SKIN.url
        }
      })
    }
  })
  .then(res => {
    return res.blob();
  })
  .then(blob => {
    const img = document.createElement('img');
    let objectURL = URL.createObjectURL(blob);
    img.src = objectURL;

    img.onload = () => {
      skin.setTextureData(img);
    }
  });
}

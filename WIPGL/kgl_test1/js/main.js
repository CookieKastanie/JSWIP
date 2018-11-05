let shadersBank;
let texturesBank;
let display, colorShader, texShadern, wowShader;
let mesh, texture1, texture2;

const W = 800, H = 800;

const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.3, 0.3, 0.3, 1.0);

  colorShader = new Shader(shadersBank.get("color.vs"), shadersBank.get("color.fs"), "colorShader");
  texShader = new Shader(shadersBank.get("tex.vs"), shadersBank.get("tex.fs"), "texShader");
  wowShader = new Shader(shadersBank.get("wow.vs"), shadersBank.get("wow.fs"), "wowShader");

  mesh1 = new Mesh([
    0.0, 0.5, 0.1,
    -1.0, 0.5, 0.1,
    -1.0, -0.5, 0.1,
    0.0, -0.5, 0.1
  ], [
    0, 1, 2,
    0, 2, 3
  ], 3, colorShader.getAttribLocation("position"));

  texture1 = new Texture(texturesBank.get("leeroyb"));
  texture2 = new Texture(texturesBank.get("gg"));

  mesh2 = new Mesh([
    0.5, 0.5, 0.0,  2.0, 0.0,
    -0.5, 0.5, 0.0, 0.0, 0.0,
    -0.5, -0.5, 0.0,  0.0, 2.0,
    0.5, -0.5, 0.0,  2.0, 2.0
  ], [
    0, 1, 2,
    0, 2, 3
  ], "3,2", [texShader.getAttribLocation("position"), texShader.getAttribLocation("texCoord")]);

  mesh3 = new Mesh([
    1.0, 1.0, 0.2,
    -1.0, 1.0, 0.2,
    -1.0, -1.0, 0.2,
    1.0, -1.0, 0.2
  ], [
    0, 1, 2,
    0, 2, 3
  ], "3", wowShader.getAttribLocation("position"));


  requestAnimationFrame(draw);
}

let pos1 = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
]);

let pos2 = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  1.0, 0.0, 0.0, 1.0
]);

let pos3 = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 1.0, 0.0, 1.0
]);

let lol = 0;
const draw = (m) => {
  display.clear();

  colorShader.use();
  mesh1.draw();

  texShader.use();

  lol++;
  if (lol == 180) {
    lol = 0;
  }

  if (lol < 90) texShader.sendInt("diffuse", 0);
  else texShader.sendInt("diffuse", 1);

  texture1.use(0);
  texture2.use(1);

  texShader.sendMat4("pos", pos1);
  mesh2.draw();
  texShader.sendMat4("pos", pos2);
  mesh2.draw();
  texShader.sendMat4("pos", pos3);
  mesh2.draw();


  wowShader.use();
  wowShader.sendFloat("time", m%10000.0);
  mesh3.draw();

  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

const main = () => {
  shadersBank = new Bank("shaders", ["color.vs", " color.fs ", "tex.vs", "tex.fs", "wow.vs", "wow.fs"]);
  texturesBank = new Bank("imgs", ["leeroy", "leeroyb", "gg"],{
    type: "png",
    bind: "img"
  });

  const prog = (v) => {
    console.log(" -> "+ v +"%");
  }

  console.log("Chargement des shaders :");
  shadersBank.chargement(prog)
  .then(() => {
    console.log("Chargement des textures :");
    return texturesBank.chargement(prog);
  })
  .then(() => {
    init();
  })
  .catch((e) => {
    console.error(e);
  });
}

loadKastanieGL(main);

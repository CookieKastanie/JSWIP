let shadersBank;
let texturesBank;
let display, colorShader, texShadern, wowShader;
let mesh, texture1, texture2;

let varpointer;
const W = 1920, H = 1080;

const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.3, 0.3, 0.3, 1.0);

  colorShader = new Shader(display.getCtx(), shadersBank.get("color.vs"), shadersBank.get("color.fs"), "colorShader");
  texShader = new Shader(display.getCtx(), shadersBank.get("tex.vs"), shadersBank.get("tex.fs"), "texShader");
  wowShader = new Shader(display.getCtx(), shadersBank.get("wow.vs"), shadersBank.get("wow.fs"), "wowShader");

  varpointer = wowShader.getUniformLocation("time");

  mesh1 = new MeshIndex(colorShader, [
    0.0, 0.5, 0.1,
    -1.0, 0.5, 0.1,
    -1.0, -0.5, 0.1,
    0.0, -0.5, 0.1
  ], [
    0, 1, 2,
    0, 2, 3
  ]);

  texture1 = new Texture(display.getCtx(), texturesBank.get("leeroy"));
  texture2 = new Texture(display.getCtx(), texturesBank.get("gg"));

  mesh2 = new MeshTex(texShader, [
    0.5, 0.5, 0.0,  1.0, 0.0,
    -0.5, 0.5, 0.0, 0.0, 0.0,
    -0.5, -0.5, 0.0,  0.0, 1.0,
    0.5, -0.5, 0.0,  1.0, 1.0
  ], [
    0, 1, 2,
    0, 2, 3
  ]);

  mesh3 = new MeshIndex(wowShader, [
    1.0, 1.0, 0.2,
    -1.0, 1.0, 0.2,
    -1.0, -1.0, 0.2,
    1.0, -1.0, 0.2
  ], [
    0, 1, 2,
    0, 2, 3
  ]);


  requestAnimationFrame(draw);
}
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
  if (lol < 90) texture1.use();
  else texture2.use();

  mesh2.draw();


  wowShader.use();
  wowShader.sendFloat(varpointer, m);
  mesh3.draw();

  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

shadersBank = new Bank("js/shaders", ["color.vs", " color.fs ", "tex.vs", "tex.fs", "wow.vs", "wow.fs"]);
texturesBank = new Bank("imgs", ["leeroy", "gg"],{
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

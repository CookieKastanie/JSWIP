let shadersBank, texturesBank;
let display, shader, mesh, texture;

const init = () => {
  display = new Display(1000, 1000);
  display.setClearColor(0.3, 0.6, 0.0, 1.0);

  shader = new Shader(display, shadersBank.get("test1.vs"), shadersBank.get("test1.fs"));

  mesh = new Mesh(display, [
    -0.5, -0.5, 0.5,    0.0, 1.0,
    0.0, 0.5, 0.5,      0.5, 0.0,
    0.5, -0.5, 0.5,     1.0, 1.0
  ], 3);

  texture = new Texture(display, texturesBank.get("leeroy"));

  shader.bind();
  draw();
}

const draw = () => {
  display.clear();
  texture.bind(0);
  mesh.draw();
}

/////////////////////////////////////////////////////////////////////////////////////

shadersBank = new Bank("js/shaders", ["test1.vs", "test1.fs"]);
texturesBank = new Bank("imgs", ["gg", "leeroy"], {
  type: "png",
  bind: "img"
});

const prog = (v) => {
  console.log(" -> "+ v +"%");
}

console.log("Chargement des shaders :");
shadersBank.chargement(prog).then(() => {
  console.log("Chargement des textures :");
  return texturesBank.chargement(prog);
}).then(() => {
  console.log("Chargements terminés");
  init();
}).catch((e) => {
  console.error(e);
});

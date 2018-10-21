let shadersBank;
let display, shader;
let mesh;
const W = 1600, H = 900;

const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.3, 0.6, 0.0, 1.0);

  shader = new Shader(display, shadersBank.get("uvColor.vs"), shadersBank.get("uvColor.fs"));

  shader.bind();
  mesh = new Mesh(display, [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ], [
    0, 1, 2,
    0, 2, 3
  ]);

  draw();
}

const draw = (m) => {
  display.clear();
  shader.setTime(m);
  mesh.draw();
  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

shadersBank = new Bank("js/shaders", ["uvColor.vs", "uvColor.fs"]);

const prog = (v) => {
  console.log(" -> "+ v +"%");
}

console.log("Chargement des shaders :");
shadersBank.chargement(prog).then(() => {
  init();
}).catch((e) => {
  console.error(e);
});

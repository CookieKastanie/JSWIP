//const W = 700, H = 580;
const W = window.innerWidth, H = window.innerHeight;
let display;
let mainShader;
let vao, vao2;
let tex;
let camera, proj, worldPosition, lightPos;

(async () => {
  await loadKastanieGLPlayground();

  const texs = new Bank("./test", ["BLF1", "blue"], {extension: "jpg", mediaType: "image", default: "BLF1"});
  await texs.load(prog => { console.log(`Chargement : ${prog}%`); });

  const meshs = new Bank("./meshs", ["cube", "dragon", "blue_falcon", "thonk"], {extension: "obj", default: "cube", treatment: Parser.obj});
  await meshs.load(prog => { console.log(`Chargement : ${prog}%`); });

  const shaders = new Bank("./shaders", ["main.vs", "main.fs", "main2.vs", "main2.fs"]);
  await shaders.load(prog => { console.log(`Chargement : ${prog}%`); });

  display = new Display(W, H);

  display.setClearColor(0.8, 0.8, 1.0, 1.0);

  mainShader = new Shader(shaders.get("main.vs"), shaders.get("main.fs"));
  mainShader2 = new Shader(shaders.get("main2.vs"), shaders.get("main2.fs"));


  let m = meshs.get("thonk");
  vao = new IndexedVAO()
  .setIBO(new IBO(m.indices))
  .addVBO(new VBO(m.positions, 3, mainShader.getAttribLocation("position")))
  .addVBO(new VBO(m.normals, 3, mainShader.getAttribLocation("normale")));

  m = meshs.get("blue_falcon");
  tex = new Texture(texs.get("BLF1"), 0);
  vao2 = new IndexedVAO()
  .setIBO(new IBO(m.indices))
  .addVBO(new VBO(m.positions, 3, mainShader2.getAttribLocation("position")))
  .addVBO(new VBO(m.normals, 3, mainShader2.getAttribLocation("normale")))
  .addVBO(new VBO(m.texcoords, 2, mainShader2.getAttribLocation("texcoords")));

  camera = new FirstPersonCamera(W, H).setSpeed(0.05).setAcc(0.005);
  worldPosition = Matrix4.identity();
  lightPos = [0, 0, 0];
  temp = Matrix4.identity();

  draw();
})();


let temp;


let a = 0;
const draw = () => {
  display.clear();
  mainShader.use();
  mainShader.sendMat4("camera", camera.getMatrix());

  Matrix4.identity(worldPosition);

  lightPos[1] = 5;
  lightPos[0] = Math.sin(a) * 10;
  lightPos[2] = Math.cos(a) * 10;

  worldPosition[12] = 0;
  worldPosition[13] = 0;
  worldPosition[14] = 0;
  mainShader.sendMat4("worldPosition", worldPosition);
  mainShader.sendVec3("lightPos", lightPos);
  vao.draw();

  //Matrix4.fromRotation(worldPosition, a, [0, 1, 1]);
  Matrix4.fromRotation(temp, -Math.PI/3, [0, 0, 1]);
  Matrix4.fromRotation(worldPosition, a + Math.PI/2, [0, 1, 0]);
  Matrix4.mult(worldPosition, worldPosition, temp);

  mainShader2.use();
  /*worldPosition[12] = 5;
  worldPosition[13] = 0;
  worldPosition[14] = 0;*/
  worldPosition[12] = lightPos[0];
  worldPosition[13] = lightPos[1];
  worldPosition[14] = lightPos[2];
  mainShader2.sendMat4("camera", camera.getMatrix());
  mainShader2.sendMat4("worldPosition", worldPosition);
  tex.use();
  vao2.draw();

  a += 0.02;

  if(a >= Math.PI * 2) a -= Math.PI * 2;

  requestAnimationFrame(draw);
}

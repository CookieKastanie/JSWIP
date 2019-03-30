let shads, objFiles, texFiles, mainShader;
let tile = 1.0;
let colour = new Float32Array([1.0, 1.0, 1.0]);

document.getElementById('tile').onmousemove = function(){
  tile = parseFloat(this.value);
}

document.getElementById('r').onmousemove = function(){
  colour[0] = parseFloat(this.value);
}

document.getElementById('g').onmousemove = function(){
  colour[1] = parseFloat(this.value);
}

document.getElementById('b').onmousemove = function(){
  colour[2] = parseFloat(this.value);
}

const load = async () => {
  shads = new Bank("shaders", ["main.vs", "main.fs"]);
  //objFiles = new Bank("meshs", ["Dragon"], {func: ObjParser.getVertsAndFaces, type: "obj"})
  texFiles = new Bank("imgs", ["wall_01_Diffuse", "wall_01_Normal"], {bind: "img", type: "png"})

  await shads.chargement();
  //await objFiles.chargement();
  await texFiles.chargement();
}

const main = async () => {
  await load();

  let display = new Display(800, 800);
  display.setClearColor(0.0, 0.0, 0.0, 0.0);
  mainShader = new Shader(shads.get('main.vs'), shads.get('main.fs'), "mainShader");
  //let dragon = new MeshNormale(mainShader, objFiles.get('Dragon').vertices, objFiles.get('Dragon').faces);


  let wall_01 = {
    mesh: new IndexedVAO([
      0.5, 0.0, 0.5,  1.0, 0.0,
      -0.5, 0.0, 0.5, 0.0, 0.0,
      -0.5, 0.0, -0.5,  0.0, 1.0,
      0.5, 0.0, -0.5,  1.0, 1.0
    ], [
      0, 2, 1,
      0, 3, 2
    ], "3,2", [mainShader.getAttribLocation("position"), mainShader.getAttribLocation("texCoord")]),
    diffuse: new Texture(texFiles.get("wall_01_Diffuse"), 0),
    normal: new Texture(texFiles.get("wall_01_Normal"), 1)
  }

  let camera = new Float32Array(16);
  let cameraPos = new Float32Array([0.2/50, 0.6/50, 0.5/50])
  Matrix4.lookAt(camera, cameraPos, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

  let projection = new Float32Array(16);
  Matrix4.perspective(projection, 1.0472, display.getWidth() / display.getHeight(), 0.001, 100.0);

  mainShader.use();
  mainShader.sendMat4("camera", camera);
  mainShader.sendMat4("meshPosition", Matrix4.identity(new Float32Array(16)));
  mainShader.sendMat4("projection", projection);

  mainShader.sendInt("diffuse", 0);
  mainShader.sendInt("texNormal", 1);

  mainShader.sendVec3("lightColour", new Float32Array([1.0, 1.0, 1.0]));
  mainShader.sendVec3("lightPosition", new Float32Array([0.0, 100.0, 500.0]));

  wall_01.diffuse.use();
  wall_01.normal.use();


  let a = 0;

  const draw = () => {
    display.clear();

    a += 0.01;

    cameraPos[0] = Math.cos(a)*0.5;
    cameraPos[1] = 0.2;
    cameraPos[2] = Math.sin(a)*0.5;

    Matrix4.lookAt(camera, cameraPos, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
    mainShader.sendVec3("cameraPos", cameraPos);
    mainShader.sendMat4("camera", camera);

    mainShader.sendVec3("lightColour", colour);
    mainShader.sendFloat("texTile", tile);

    wall_01.mesh.draw();

    requestAnimationFrame(draw);
  }

  draw();
}

loadKastanieGL(main);

let shads, objFiles;

const load = async () => {
  shads = new Bank("shaders", ["main.vs", "main.fs"]);
  objFiles = new Bank("meshs", ["Dragon"], {func: ObjParser.getVertsAndFaces, type: "obj"})

  await shads.chargement();
  await objFiles.chargement();
}

const main = async () => {
  await load();

  let display = new Display(800, 800);
  let mainShader = new Shader(display.getCtx(), shads.get('main.vs'), shads.get('main.fs'));
  let dragon = new MeshNormale(mainShader, objFiles.get('Dragon').vertices, objFiles.get('Dragon').faces);

  let p_camera = mainShader.getUniformLocation("camera");
  let m_camera = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]);

  mainShader.use();
  mainShader.sendMat4(p_camera, m_camera);
}

loadKastanieGL(main);

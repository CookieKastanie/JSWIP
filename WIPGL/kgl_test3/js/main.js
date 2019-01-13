let shadersBank;
let display, shaders;
let meshs, textures, frameBuffers;

let frameBuffer;

let camera;
let cameraPos;
let projection;


let fpsCam;

const W = 800, H = 800;

const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.0, 0.0, 0.0, 1.0);

  fpsCam = new FirstPersonneCamera(W, H);

  shaders = {
    color: new Shader(shadersBank.get("color.vs"), shadersBank.get("color.fs"), "colorShader"),
    lightCut: new Shader(shadersBank.get("lightCut.vs"), shadersBank.get("lightCut.fs"), "lightCut"),
    vertBlur: new Shader(shadersBank.get("vertBlur.vs"), shadersBank.get("blur.fs"), "vertBlur"),
    horBlur: new Shader(shadersBank.get("horBlur.vs"), shadersBank.get("blur.fs"), "horBlur"),
    mixBloom: new Shader(shadersBank.get("lightCut.vs"), shadersBank.get("mixBloom.fs"), "horBlur"),
  };

  frameBuffers = {
    screen0: new FrameBuffer(W, H),
    screen1: new FrameBuffer(W, H, {texColor: true}),
    screen2: new FrameBuffer(W, H, {texColor: true})
  }

  meshs = {
    cube: new IndexedVAO(boxVertices, boxIndices, [3, 3], [shaders.color.getAttribLocation("position"), shaders.color.getAttribLocation("couleur")]),
    posCube1: Matrix4.identity(new Float32Array(16)),
    posCube2: Matrix4.identity(new Float32Array(16)),
    posCube3: Matrix4.identity(new Float32Array(16)),
    rect: new IndexedVAO([
      1.0, 1.0,
      -1.0, 1.0,
      -1.0, -1.0,
      1.0, -1.0
    ], [
      0, 1, 2,
      0, 2, 3
    ], 2, shaders.vertBlur.getAttribLocation("position"))
  };


  camera = new Float32Array(16);
  cameraPos = new Float32Array([0.2/50, 0.6/50, 0.5/50])
  Matrix4.lookAt(camera, cameraPos, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

  projection = new Float32Array(16);
  Matrix4.perspective(projection, 1.0472, display.getWidth() / display.getHeight(), 0.001, 100.0);

  shaders.color.use();
  shaders.color.sendMat4("camera", camera);
  shaders.color.sendMat4("worldPos", Matrix4.identity(new Float32Array(16)));
//  shaders.color.sendMat4("projection", projection);

  meshs.posCube2[12] = 1.0;
  meshs.posCube2[13] = 1.0;
  meshs.posCube2[14] = 1.0;

  meshs.posCube3[12] = -3.0;
  meshs.posCube3[13] = -2.0;
  meshs.posCube3[14] = 1.0;

  /*shaders.horBlur.use();
  shaders.horBlur.sendFloat("width", display.getWidth()/32);

  shaders.vertBlur.use();
  shaders.vertBlur.sendFloat("height", display.getHeight()/32);*/

  shaders.mixBloom.use();
  shaders.mixBloom.sendInt("originalTex", 0);
  shaders.mixBloom.sendInt("cutTex", 1);

  requestAnimationFrame(draw);
}

//let a = 0;
const draw = () => {
  shaders.color.use();

  frameBuffers.screen0.use();
  display.clear();

  /*a += 0.01;

  cameraPos[0] = Math.cos(a)*3;
  cameraPos[1] = 1.5;
  cameraPos[2] = Math.sin(a)*3;*/

//  Matrix4.lookAt(camera, cameraPos, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
  //fpsCam.eye = cameraPos;
  shaders.color.sendMat4("camera", fpsCam.getMatrix());

  shaders.color.sendMat4("worldPos", meshs.posCube1);
  meshs.cube.draw();

  shaders.color.sendMat4("worldPos", meshs.posCube2);
  meshs.cube.draw();

  shaders.color.sendMat4("worldPos", meshs.posCube3);
  meshs.cube.draw();


  /////////////////////////////////////////////////

  shaders.lightCut.use();
  frameBuffers.screen1.use();
  //display.useDefaultFrameBuffer();
  display.clear();
  frameBuffers.screen0.getTexture().use(0);

  meshs.rect.draw();


  ////////////////////////////////

  shaders.horBlur.use();
  shaders.horBlur.sendFloat("width", display.getWidth()/32);
  frameBuffers.screen2.use();
  display.clear();
  frameBuffers.screen1.getTexture().use(0);
  meshs.rect.draw();

  shaders.vertBlur.use();
  shaders.vertBlur.sendFloat("height", display.getWidth()/32);
  frameBuffers.screen1.use();
  display.clear();
  frameBuffers.screen2.getTexture().use(0);
  meshs.rect.draw();

  //////////////////////////////////////////////////////

  shaders.horBlur.use();
  shaders.horBlur.sendFloat("width", display.getWidth()/4);
  frameBuffers.screen2.use();
  display.clear();
  frameBuffers.screen1.getTexture().use(0);
  meshs.rect.draw();

  shaders.vertBlur.use();
  shaders.vertBlur.sendFloat("height", display.getWidth()/4);
  frameBuffers.screen1.use();
  //display.useDefaultFrameBuffer();
  display.clear();
  frameBuffers.screen2.getTexture().use(0);
  meshs.rect.draw();



  ///////////////////////////////////////////////////


  shaders.mixBloom.use();
  //shaders.mixBloom.sendInt("originalTex", 0);
  //shaders.mixBloom.sendInt("cutTex", 1);
  display.useDefaultFrameBuffer();
  display.clear();
  frameBuffers.screen0.getTexture().use(0);
  frameBuffers.screen1.getTexture().use(1);
  meshs.rect.draw();


  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

const main = () => {
  shadersBank = new Bank("shaders", ["color.vs", "color.fs", "horBlur.vs", "vertBlur.vs", "blur.fs", "lightCut.vs", "lightCut.fs", "mixBloom.fs"]);

  const prog = (v) => {
    console.log(" -> "+ v +"%");
  }

  console.log("Chargement des shaders :");
  shadersBank.chargement(prog)
  .then(() => {
    init();
  })
  .catch((e) => {
    console.error(e);
  });
}

loadKastanieGLPlayground(main);














//////////////////////////////





const boxVertices =
	[ // X, Y, Z           R, G, B
		// Top jaune
		-1.0, 1.0, -1.0,   0.945, 0.769, 0.059,
		-1.0, 1.0, 1.0,    0.945, 0.769, 0.059,
		1.0, 1.0, 1.0,     0.945, 0.769, 0.059,
		1.0, 1.0, -1.0,    0.945, 0.769, 0.059,

		// Left bleu
		-1.0, 1.0, 1.0,    0.204, 0.596, 0.859,
		-1.0, -1.0, 1.0,   0.204, 0.596, 0.859,
		-1.0, -1.0, -1.0,  0.204, 0.596, 0.859,
		-1.0, 1.0, -1.0,   0.204, 0.596, 0.859,

		// Right violet
		1.0, 1.0, 1.0,    0.608, 0.349, 0.714,
		1.0, -1.0, 1.0,   0.608, 0.349, 0.714,
		1.0, -1.0, -1.0,  0.608, 0.349, 0.714,
		1.0, 1.0, -1.0,   0.608, 0.349, 0.714,

		// Front rouge
		1.0, 1.0, 1.0,    0.906, 0.298, 0.235,
		1.0, -1.0, 1.0,    0.906, 0.298, 0.235,
		-1.0, -1.0, 1.0,    0.906, 0.298, 0.235,
		-1.0, 1.0, 1.0,    0.906, 0.298, 0.235,

		// Back vert
		1.0, 1.0, -1.0,    0.18, 0.8, 0.443,
		1.0, -1.0, -1.0,    0.18, 0.8, 0.443,
		-1.0, -1.0, -1.0,    0.18, 0.8, 0.443,
		-1.0, 1.0, -1.0,    0.18, 0.8, 0.443,

		// Bottom gris
		-1.0, -1.0, -1.0,   0.204, 0.286, 0.369,
		-1.0, -1.0, 1.0,    0.204, 0.286, 0.369,
		1.0, -1.0, 1.0,     0.204, 0.286, 0.369,
		1.0, -1.0, -1.0,    0.204, 0.286, 0.369,
	];

	const boxIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

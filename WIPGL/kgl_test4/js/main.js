let shadersBank;
let display, shaders, meshs, textures;

const W = 600, H = 600;
//const W = 1600, H = 900;


const video = document.createElement("video");
video.width = W;
video.height = H;
//document.getElementsByTagName("body")[0].appendChild(video);


const getStream = () => {
  let constraint = {
    video: {
      width: W,
      height: H
    }
  };

  navigator.mediaDevices.getUserMedia(constraint).then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      requestAnimationFrame(draw);
    }
  });
}

getStream();


const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.0, 0.0, 0.0, 1.0);

  shaders = {
    color: new Shader(shadersBank.get("color.vs"), shadersBank.get("color.fs"), "colorShader"),
    simpleTexture: new Shader(shadersBank.get("simpleTexture.vs"), shadersBank.get("simpleTexture.fs"), "simpleTexture")
  };

  textures = {
    stream: new Texture(W, H)
  };

  meshs = {
    rect: new IndexedVAO([
      1.0, 1.0,   0.5, 1.0, 0.2,
      -1.0, 1.0,  0.5, 0.5, 0.2,
      -1.0, -1.0, 0.7, 0.3, 0.2,
      1.0, -1.0,  0.7, 0.3, 0.2
    ], [
      0, 1, 2,
      0, 2, 3
    ], [2, 3], [shaders.color.getAttribLocation("position"), shaders.color.getAttribLocation("couleur")]),

    rectTex: new IndexedVAO([
      1.0, 1.0,   1.0, 0.0,
      -1.0, 1.0,  0.0, 0.0,
      -1.0, -1.0, 0.0, 1.0,
      1.0, -1.0,  1.0, 1.0
    ], [
      0, 1, 2,
      0, 2, 3
    ], [2, 2], [shaders.simpleTexture.getAttribLocation("position"), shaders.simpleTexture.getAttribLocation("texCoord")])
  };

  //shaders.color.use();
  shaders.simpleTexture.use();
  shaders.simpleTexture.sendInt("diffuse", 0);
  textures.stream.use();

  let img = new Image();
  img.src = "./test.png";
  img.onload = () => {
    textures.stream.setTextureData(img);
  }

  //requestAnimationFrame(draw);
}

const draw = () => {
  display.clear();

  //meshs.rect.draw();
  textures.stream.setTextureData(video);
  meshs.rectTex.draw();

  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

const main = () => {
  shadersBank = new Bank("shaders", ["color.vs", "color.fs", "simpleTexture.vs", "simpleTexture.fs"]);

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

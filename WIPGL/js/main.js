let shadersBank, meshsBank, texturesBank;
let display, shader, mesh, texture, texture2;
let camera, proj;
const W = 1000, H = 1000;

let camPos = {
  x: 0, y: 0, z: 0.5,
  vx: 0, vy: 0,vz: 0
};

const init = () => {
  display = new Display(W, H);
  display.setClearColor(0.3, 0.6, 0.0, 1.0);

  shader = new Shader(display, shadersBank.get("test1.vs"), shadersBank.get("test1.fs"));

  const m = JSON.parse(meshsBank.get("test1"));
  mesh = new Mesh(display, m.vertices, m.vertices_numb);

  texture = new Texture(display, texturesBank.get("leeroy"));
  texture2 = new Texture(display, texturesBank.get("gg"));

  camera = new Float32Array(16);
  proj = new Float32Array(16);
  Mat.perspective(proj, 1.0472, W / H, 0.001, 1000.0);

  shadersBank = null;
  meshsBank = null;
  texturesBank = null;

  shader.bind();
  draw();
}

const draw = () => {
  display.clear();

  camPos.x += camPos.vx;
  camPos.y += camPos.vy;
  camPos.z += camPos.vz;
  Mat.lookAt(camera, [camPos.x, camPos.y, camPos.z], [0, 0, -1], [0, 1, 0])

  shader.bindCam(camera);
  shader.bindProj(proj);

  texture2.bind(0);
  mesh.draw();

  texture.bind(0);
  mesh.draw();

  requestAnimationFrame(draw);
}

/////////////////////////////////////////////////////////////////////////////////////

shadersBank = new Bank("js/shaders", ["test1.vs", "test1.fs"]);
meshsBank = new Bank("meshs", ["test1"], {
  type: "json",
});
texturesBank = new Bank("imgs", ["gg", "leeroy"], {
  type: "png",
  bind: "img"
});

const prog = (v) => {
  console.log(" -> "+ v +"%");
}

console.log("Chargement des shaders :");
shadersBank.chargement(prog).then(() => {
  console.log("Chargement des meshs :");
  return meshsBank.chargement(prog);
}).then(() => {
  console.log("Chargement des textures :");
  return texturesBank.chargement(prog);
}).then(() => {
  console.log("Chargements terminés");
  init();
}).catch((e) => {
  console.error(e);
});

///////////////

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 90:
      camPos.vy = 0.05;
      break;

    case 83:
      camPos.vy = -0.05;
      break;

    case 81:
      camPos.vx = -0.05;
      break;

    case 68:
      camPos.vx = 0.05;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 90:
      camPos.vy = 0;
      break;

    case 83:
      camPos.vy = 0;
      break;

    case 81:
      camPos.vx = 0;
      break;

    case 68:
      camPos.vx = 0;
      break;
  }
});

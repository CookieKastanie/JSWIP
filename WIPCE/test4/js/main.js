const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 700;
document.getElementsByTagName('body')[0].appendChild(canvas);
const ctx = canvas.getContext('2d');



function matrixToObjects(tab){
  const v = new Array();
  for (let t of tab) {
    v.push(new Vecteur(t[0], t[1]));
  }

  return v;
}






/*const b1 = new Box2D(0, 0,  matrixToObjects([
  [100, 100],
  [100, -100],
  [0, -200],
  [-100, -100],
  [-100, 100]
]));*/

/*const b1 = new Box2D(0, 0,  matrixToObjects([
  [-100, -100],
  [+50, -50],
  [+50, +100],
  [-50, +50]
]));*/

const b1 = new Box2D(canvas.width/2, 0,  matrixToObjects([
  [-10, 10],
  [-10, -10],
  [10, -10],
  [10, 10]
]));


/*const b2 = new Box2D(300, 300,  matrixToObjects([
  [100, 100],
  [100, -100],
  [-100, -100],
  [-100, 100]
]));*/

const b2 = new Box2D(canvas.width/2, canvas.height/2,  matrixToObjects([
  [-50, +50],
  [-50, -100],
  [+150, -50],
  [+150, +50],
  [+50, +100],
]));

const listeRendu = [b1, b2];





let col = 0;

let collision = null;

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.lineWidth = 3;
  for (let b of listeRendu) {
    if(col == 0) ctx.strokeStyle = '#fff';
    else ctx.strokeStyle = '#f00';

    ctx.beginPath();
    let first = true;

    for (let v of b.sommets) {
      if(first){
        ctx.moveTo(v.x, v.y);
        first = false;
      }
      ctx.lineTo(v.x, v.y);
    }

    ctx.closePath();
    ctx.stroke();

    /*ctx.strokeStyle = '#0f0';
    ctx.beginPath();

    for (let i = 0; i < b.sommets.length; ++i) {
      let s = b.sommets[i];
      let a = b.faces[i].axe;

      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + a.x * 100, s.y + a.y * 100);
    }

    ctx.stroke();*/

  }


  if (collision) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#00f';
    ctx.beginPath();

    ctx.moveTo(collision.p1.x, collision.p1.y);
    ctx.lineTo(collision.p2.x, collision.p2.y);

    ctx.stroke();
  }


  col = 0;
}


let mouseX = 0;
let mouseY = 0;

const update = () => {
  let vx = mouseX - b1.pos.x;
  let vy = mouseY - b1.pos.y;

  let dist = Math.sqrt(vx * vx + vy * vy) / 1000 /*1*/;

  b1.move(vx * dist, vy * dist);

  collision = testCollision(b1, b2);

  //if(projectAll(b1, b2) && projectAll(b2, b1)) col = 1;


  //console.log(t);
}

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
}



//////////////////////////////////////////////////////////////////////////////////

const body = document.getElementsByTagName('body')[0];

document.addEventListener("mousemove", (event) => {
  mouseX = ((event.clientX + body.scrollLeft) - canvas.offsetLeft)*(canvas.width/canvas.offsetWidth);
  mouseY = ((event.clientY + body.scrollTop) - canvas.offsetTop)*(canvas.height/canvas.offsetHeight);
});



window.addEventListener('wheel', (e) =>  {
  let d = e.deltaY/500;

  b1.rotation(d);
});









const pr1 = {};
const pr2 = {};

let pr = {};

const testCollision = (b1, b2) => {
  pr1.finalV = Infinity;
  pr1.axe = null;
  pr1.face = null;

  pr2.finalV = Infinity;
  pr2.axe = null;
  pr2.face = null;

  pr = pr1;
  pr1.axe = projectAll(b1, b2);

  pr = pr2;
  pr2.axe = projectAll(b2, b1);



  if (pr1.finalV && pr2.finalV) {
    if(pr1.finalV >= pr2.finalV){
      /*if(pr2.axe) */b1.move(pr2.axe.x * pr2.finalV, pr2.axe.y * pr2.finalV);
      return pr2.face;
    } else {
      /*if(pr1.axe) */b1.move(-pr1.axe.x * pr1.finalV, -pr1.axe.y * pr1.finalV);
      return pr1.face;
    }
  }

  return null;
}



const projectAll = (box1, box2) => {
  let axeFinal;

  //////////////////////
  let faceFinal;
  //////////////////////

  for (let face of box1.faces) {
    let axe = face.axe;

    let zero = face.p1.projectionSurVecteurAxe(axe);

    let min = Infinity;
    for (let sommet of box2.sommets) {
      let val = sommet.projectionSurVecteurAxe(axe);
      if (val < min) min = val;
    }

    if(min > zero) {
      pr.finalV = 0;
      return null;
    } else {
      let ecare = zero - min;

      if(pr.finalV > ecare){
        pr.finalV = ecare;

        axeFinal = axe;

        //////////////////////
        faceFinal = face;
        //////////////////////
      }
    }
  }

  //////////////////////
  pr.face = faceFinal;
  //////////////////////

  return axeFinal;
}



/*const projectAll = (box1, box2) => {
  for (let face of box1.faces) {
    let axe = face.axe;

    let zero = face.p1.projectionSurVecteurAxe(axe);

    let min = Infinity;
    for (let sommet of box2.sommets) {
      let val = sommet.projectionSurVecteurAxe(axe);
      if (val < min) min = val;
    }

    if(min > zero) return false;
  }

  return true;
}*/






loop();

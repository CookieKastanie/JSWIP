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












const b1 = new Box2D(0, 0,  matrixToObjects([
  [100, 100],
  [100, -100],
  //[0, -200],
  [-100, -100],
  [-100, 100]
]));


const b2 = new Box2D(300, 300,  matrixToObjects([
  [100, 100],
  [100, -100],
  [-100, -100],
  [-100, 100]
]));

const listeRendu = [b1, b2];







const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.lineWidth = 3;
  for (let b of listeRendu) {
    ctx.strokeStyle = '#fff';
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







    ctx.strokeStyle = '#0f0';
    ctx.beginPath();

    for (let i = 0; i < b.sommets.length; ++i) {
      let s = b.sommets[i];
      let a = b.axes[i];

      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + a.x * 100, s.y + a.y * 100);
    }

    ctx.stroke();

  }
}


let mouseX = 0;
let mouseY = 0;

const update = () => {
  let vx = mouseX - b1.pos.x;
  let vy = mouseY - b1.pos.y;

  let dist =/* Math.sqrt(vx * vx + vy * vy) / 1000*/ 1;

  b1.move(vx * dist, vy * dist);

  /*let t = b1.testWith(b2);
  if(t) ctx.strokeStyle = '#f00';*/

  testCollision(b1, b2);

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











const pr = {};

const testCollision = (b1, b2) => {
  pr.finalV = Infinity;
  pr.axeB1 = null;
  pr.axeB2 = null;
//  pr.finalAxe = null;


  //pr.axeB1 = projectAll(b1, b2);

  //const saveV = pr.finalV;

  pr.axeB2 = projectAll(b1, b2);

//console.log(pr);
  //if(saveV >= pr.finalV){
    console.log(pr.finalV, pr.axeB2);
    //if(pr.axeB2) b1.move(pr.axeB2.x * pr.finalV, pr.axeB2.y * pr.finalV);
  //} else {
    //console.log("b1");
    //if(pr.axeB1) b1.move(-pr.axeB1.x * pr.finalV, -pr.axeB1.y * pr.finalV);
  //}


}




const projectAll = (self, box) => {

  let axe = null;
console.log("///////////////////////////////////////////////");

  for (let a of box.axes) {

    let aMin = Infinity;
    let aMax = -Infinity;
    for (let s of self.sommets) {
      let val = s.projectionSurVecteurAxe(a);
      if (val < aMin) aMin = val;
      if (val > aMax) aMax = val;
    }

    let bMin = Infinity;
    let bMax = -Infinity;
    for (let s of box.sommets) {
      let val = s.projectionSurVecteurAxe(a);
      if (val < bMin) bMin = val;
      if (val > bMax) bMax = val;
    }

//////////////////////////////////////////////////////////////////////////////

    if (aMax < bMin || bMax < aMin) {
      pr.finalV = 0;
      console.log("rien");
      return null;
    }

    else if (aMin <= bMin && bMin <= aMax) {
      let v = Math.abs(aMax - bMin);
      console.log("a", v);

      if(pr.finalV > v) {
        pr.finalV = v;
        axe = a;

      }
    }
    else if (aMin <= bMax && bMax <= aMax) {
      let v = Math.abs(bMax - aMin);
      console.log("b", v);

      if(pr.finalV > v) {
        pr.finalV = v;

        axe = a;
      }
    }
    else {
      //let v = Math.abs(aMin - bMax);
      //if(collision < v) collision = v;

      console.log("WFT");
    };
  }

  return axe;
}









loop();

class Camera {
  constructor(width, height) {
    this.camMatrix = Matrix4.identity(new Float32Array(16));
    this.projMatrix = Matrix4.perspective(Matrix4.identity(new Float32Array(16)), 1.0472, width / height, 0.001, 1000.0);

    this.finalMat = Matrix4.identity(new Float32Array(16));

    this.eye = [0, 0, 5];
    this.center = [0, 0, 0];
    this.up = [0, 1, 0];
  }

  getMatrix(){
    Matrix4.lookAt(this.camMatrix, this.eye, this.center, this.up);
    return Matrix4.mult(this.finalMat, this.projMatrix, this.camMatrix);
  }
}

class FirstPersonneCamera extends Camera {
  constructor(width, height) {
    super(width, height);

    this.sensibilite = 0.004;

    this.movX = 0;
    this.movY = 0;

    this.canvas = document.getElementById("kgl-canvas");
    this.canvas.addEventListener("click", () => {
      if (!document.pointerLockElement) this.canvas.requestPointerLock();
    });

    this.canvas.addEventListener("mousemove", e => {
      if (!!document.pointerLockElement){
        this.movX = -e.movementX * this.sensibilite;
        this.movY = -e.movementY * this.sensibilite;
      }
    }, false);

    document.addEventListener("keydown", e => {
      //if (!!document.pointerLockElement){
        console.log(e);
        switch (e.key) {
          case 'z': ++this.eye[0]; ++this.center[0]; break;
          case 'q': ++this.eye[2]; ++this.center[2]; break;
          case 's': --this.eye[0]; --this.center[0]; break;
          case 'd': --this.eye[2]; --this.center[2]; break;
        }
      //}
    });
  }

  getMatrix(){
    //this.eye.[0] += Math.sin(@camera.rotation.y) * frontal + Math.cos(-@camera.rotation.y) * lateral
    //this.eye.[2] += Math.cos(@camera.rotation.y) * frontal + Math.sin(-@camera.rotation.y) * lateral

    this.center[0] -= this.eye[0];
    this.center[1] -= this.eye[1];
    this.center[2] -= this.eye[2];

    //rot x
    //let x = this.center[0];
    let y = this.center[1];
    let z = this.center[2];

    //this.center[0] = x;
    this.center[1] = y*Math.cos(this.movY) - z*Math.sin(this.movY);
    this.center[2] = y*Math.sin(this.movY) + z*Math.cos(this.movY);

    //rot y
    let x = this.center[0];
    //y = this.center[1];
    z = this.center[2];

    this.center[0] = x*Math.cos(this.movX) + z*Math.sin(this.movX);
    //this.center[1] = y;
    this.center[2] = -x*Math.sin(this.movX) + z*Math.cos(this.movX);


console.log(this.center[0], this.center[1], this.center[2]);


    this.center[0] += this.eye[0];
    this.center[1] += this.eye[1];
    this.center[2] += this.eye[2];

/*
this.center[0] += this.movX;
this.center[1] += this.movY;*/
    ////////////////////////////////////

    let mat = super.getMatrix();
    this.movX = 0;
    this.movY = 0;
    return mat;
  }
}

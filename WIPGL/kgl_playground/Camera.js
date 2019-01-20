class Camera {
  constructor(width, height) {
    this.camMatrix = Matrix4.identity(new Float32Array(16));
    //this.projMatrix = Matrix4.perspective(Matrix4.identity(new Float32Array(16)), 1.0472, width / height, 0.001, 100.0);
    this.projMatrix = Matrix4.perspective(Matrix4.identity(new Float32Array(16)), 1.0472, width / height, 0.001, 0.1);

    this.finalMat = Matrix4.identity(new Float32Array(16));

    /*this.eye = [0, 0, 5];
    this.center = [0, 0, 0];
    this.up = [0, 1, 0];*/
  }

  getMatrix(){
    //Matrix4.lookAt(this.camMatrix, this.eye, this.center, this.up);
    return Matrix4.mult(this.finalMat, this.projMatrix, this.camMatrix);
  }
}

Camera.DEMIPI = Math.PI / 2.0;

class FirstPersonneCamera extends Camera {
  constructor(width, height) {
    super(width, height);

    this.sensibilite = 0.004;
    this.maxSpeed = 0.4;


    this.x = 0; this.y = 0; this.z = 0;
    //this.dx = 0; this.dy = 0; this.dz = 0;
    this.aX = 0; this.aY = 0; this.aZ = 0;

    this.front = 0; this.lat = 0; this.haut = 0;

    this.temp = Matrix4.identity(new Float32Array(16));

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
      if (!!document.pointerLockElement){
        if(e.ctrlKey) e.preventDefault();
        switch (e.keyCode) {
          case 90: this.front = this.maxSpeed; break;
          case 81: this.lat = this.maxSpeed; break;
          case 83: this.front = -this.maxSpeed; break;
          case 68: this.lat = -this.maxSpeed; break;
          case 32: this.haut = -this.maxSpeed; break;
          case 17: this.haut = this.maxSpeed; break;
        }
      }
    });

    document.addEventListener("keyup", e => {
      if (!!document.pointerLockElement){
        switch (e.keyCode) {
          case 90: this.front = 0; break;
          case 81: this.lat = 0; break;
          case 83: this.front = 0; break;
          case 68: this.lat = 0; break;
          case 32: this.haut = 0; break;
          case 17: this.haut = 0; break;
        }
      }
    });
  }

  getMatrix(){
    let angle = Math.atan2(this.movX, this.movY);
    let dist = Math.sqrt(Math.pow(this.movX, 2) + Math.pow(this.movY, 2));

    this.aX -= Math.cos(angle) * dist;
    this.aY -= Math.sin(angle) * dist;

    this.x += Math.sin(-this.aY) * this.front + Math.cos(this.aY) * this.lat;
    this.y += this.haut;
    this.z += Math.cos(-this.aY) * this.front + Math.sin(this.aY) * this.lat;

    if (this.aX > Camera.DEMIPI) this.aX = Camera.DEMIPI;
    else if (this.aX < -Camera.DEMIPI) this.aX = -Camera.DEMIPI;


    Matrix4.identity(this.camMatrix);

    //Mc = RX * RY * T * Mi

    this.camMatrix[12] = this.x;
    this.camMatrix[13] = this.y;
    this.camMatrix[14] = this.z;

    //rotY
    Matrix4.identity(this.temp);
    this.temp[0] = Math.cos(this.aY);
    this.temp[8] = Math.sin(this.aY);
    this.temp[2] = -Math.sin(this.aY);
    this.temp[10] = Math.cos(this.aY);

    Matrix4.mult(this.camMatrix, this.temp, this.camMatrix);

    //rotX
    Matrix4.identity(this.temp);
    this.temp[5] = Math.cos(this.aX);
    this.temp[9] = -Math.sin(this.aX);
    this.temp[6] = Math.sin(this.aX);
    this.temp[10] = Math.cos(this.aX);

    Matrix4.mult(this.camMatrix, this.temp, this.camMatrix);

    this.movX = 0;
    this.movY = 0;
    return super.getMatrix();
  }
}

class TimersManager {
  constructor() {

  }


}

class Timer {
  constructor() {
    this.stopTime = Date.now();
    this.pauseLength = this.stopTime;
  }

  getVal() {
    return (Date.now() - this.pauseLength) / 1000;
  }

/*  stop() {
    this.stopTime = Date.now();
  }

  start() {
    this.pauseLength =
  }*/
}

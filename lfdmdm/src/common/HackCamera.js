import { FirstPersonCamera } from "akila/utils";

export class HackCamera extends FirstPersonCamera {
    constructor() {
        super(16, 9);
    }
    
    setPosition() {
        this.update();
    }
}

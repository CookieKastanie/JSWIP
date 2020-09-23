import { mat4, quat, vec3 } from 'Akila/math';

export class Transform {
    constructor() {
        this.position = vec3.create();
        this.quat = quat.create();
        this.matrix = mat4.create();
    }

    setPosition(v) {
        vec3.copy(this.position, v);
    }

    translate(v) {
        vec3.add(this.position, this.position, v);
    }

    rotateZ(a) {
        quat.rotateZ(this.quat, this.quat, a);
    }

    getQuat() {
        return this.quat;
    }

    toMat4() {
        return mat4.fromRotationTranslation(this.matrix, this.quat, this.position);
    }

    getMat4() {
        return this.matrix;
    }
}

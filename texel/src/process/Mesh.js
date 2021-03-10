import { VAO, VBO } from "akila/webgl";

export class Mesh {
    static init() {
        Mesh.quad = new VAO()
        .addVBO(new VBO([
            3,1,   -1,1,  -1,-3,
        ], 2, 0));
    }
}

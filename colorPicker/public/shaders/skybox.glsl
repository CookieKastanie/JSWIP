#VERT_START

attribute vec3 vertex;

varying vec3 texCoords;

uniform mat4 projection;
uniform mat4 view;

void main() {
    texCoords = vertex;
    gl_Position = (projection * view * vec4(vertex, 1.0)).xyww;
}

#FRAG_START

varying vec3 texCoords;

uniform samplerCube skybox;

void main() {
    gl_FragColor = textureCube(skybox, texCoords);
}

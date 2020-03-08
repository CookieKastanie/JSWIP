precision mediump float;

attribute vec2 vertex;
uniform mat4 camera;

void main(){
    gl_Position = camera * vec4(vertex, 0.0, 1.0);
}

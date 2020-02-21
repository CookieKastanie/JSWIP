precision mediump float;

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;

uniform mat4 projectionView;
uniform mat4 model;

varying vec3 pixel;
varying vec3 norm;

void main(){
    pixel = color;

    //norm = (model * vec4(normal, 1.0)).xyz;
    norm = mat3(model) * normal;

    gl_Position = projectionView * model * vec4(position, 1.0);
}

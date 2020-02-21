precision mediump float;

const vec3 skyA = vec3(0.455, 0.725, 1);
const vec3 skyB = vec3(1, 0.918, 0.655);

const float offSet = 0.4;

uniform float angle;

varying vec2 uv;

void main() {
    gl_FragColor = vec4(mix(skyB, skyA, uv.y - angle + offSet), 1.0);
}

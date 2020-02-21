precision mediump float;

//const vec3 sunColor = vec3(0.925, 0.941, 0.945);
//const vec3 sunColor = vec3(0.4, 0.4, 0.4);

varying vec2 sun;

varying vec2 uv;

void main() {
    float d = sqrt((sun.x - uv.x) * (sun.x - uv.x) + (sun.y - uv.y) * (sun.y - uv.y));
    //gl_FragColor = vec4(sunColor, 2.0 - exp(d));
    ///gl_FragColor = vec4(vec3(2.0 - exp(d)), 1.0);
    gl_FragColor = vec4(vec3(-0.2 * log(d)), 1.0);
}

precision mediump float;

/*uniform float xOff;
uniform float yOff;
uniform float inverse;*/

uniform float datas[3];

varying vec2 uv;

void main() {
    //gl_FragColor = vec4(sin(uv * 3.0) + xOff, yOff, 1.0);
    
    //gl_FragColor = vec4(sin(uv.x - xOff), sin(uv.y + yOff), inverse, 1.0);

    gl_FragColor = vec4(sin(uv.x - datas[0]), sin(uv.y + datas[1]), sin(datas[2]), 1.0);
}

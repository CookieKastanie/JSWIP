precision mediump float;

uniform sampler2D tex;

varying vec2 pix;

void main() {
    gl_FragColor = texture2D(tex, pix);
    //gl_FragColor = vec4(pix, 0.0, 1.0);
}

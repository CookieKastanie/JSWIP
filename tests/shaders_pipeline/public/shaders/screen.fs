precision mediump float;

uniform sampler2D tex;

varying vec2 uv;

void main() {
    //gl_FragColor = vec4(texture2D(tex, uv).r, 0.0, 0.0, 1.0);

    vec4 color = texture2D(tex, uv);
    gl_FragColor = vec4(1.0 - color.rrr, color.a);
}

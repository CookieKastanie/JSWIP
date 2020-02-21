precision mediump float;

uniform float time;

varying vec2 uv;

uniform sampler2D texture;
uniform vec2 lightPositionOnScreen;

void main() {
    float trigger = texture2D(texture, vec2(uv.x, 1.0 - uv.y)).b > 0.001 ? 1.0 : 0.0;

    float n = 1.0;
    n *= 1.0 - length(vec2(uv.x, 1.0 - uv.y) - lightPositionOnScreen) * 3.0;



    //gl_FragColor = vec4(n, n, n * sin(time) *  + 0.5, 1.0) * trigger;
    gl_FragColor = vec4(n, n, n * 0.6, 1.0) * trigger;

    //gl_FragColor = vec4(n * cos(time), n * (1.0 - sin(time)), n, 1.0) * trigger;
}

precision mediump float;

uniform vec3 normalizedSunPos;

varying vec3 pixel;
varying vec3 norm;

void main() {
    float d = dot(norm, normalizedSunPos) * 0.5 + 0.5;
    //float d = dot(norm, normalizedSunPos);

    gl_FragColor = vec4(pixel * d * 1.4, 1.0);

    //gl_FragColor = vec4(norm, 1.0);
}

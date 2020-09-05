#VERT_START

attribute vec3 in_vertex;
attribute vec3 in_normal;
attribute vec2 in_uv;

uniform mat4 model;
uniform mat4 vp;

varying vec3 normal;
varying vec2 uv;

void main() {
    gl_Position = vp * model * vec4(in_vertex, 1.0);
    normal = mat3(model) * in_normal;
    uv = in_uv;
}

#FRAG_START

varying vec3 normal;
varying vec2 uv;

const vec3 lightDir = vec3(-0.9995, -0.004, 0.001);

void main() {
    float b = max(dot(lightDir, normalize(normal)), 0.0);
    //gl_FragColor = vec4(abs(normal) * b, 1.0);
    gl_FragColor = vec4(vec3(b), 1.0);
    //gl_FragColor = vec4(uv, 0.0, 1.0);
}

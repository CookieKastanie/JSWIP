precision mediump float;

attribute vec2 position;

uniform mat4 projectionView;
uniform vec3 sunPos;
uniform float ratio;

varying vec2 uv;
varying vec2 sun;

void main(){
    vec4 pos = projectionView * vec4(sunPos, 1.0);

    if(pos.w <= 0.0) gl_Position = vec4(0.0);
    else {
        sun.x = pos.x / pos.w;
        sun.y = pos.y / pos.w;
        //uv = position;
        uv.x = position.x * ratio;
        uv.y = position.y;
        gl_Position = vec4(position, 0.0, 1.0);
    }
}

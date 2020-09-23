#VERT_START

attribute vec2 position;
attribute vec2 texpos;

varying vec2 uv;

uniform mat3 transform;

void main(){
    uv = (transform * vec3(texpos, 1.0)).xy;
    gl_Position = vec4(position, 0.0, 1.0);
}


#FRAG_START

varying vec2 uv;

float mandelbrot(float a, float b) {
    float x = 0.0;
    float y = 0.0;
    for(int t = 0; t < 80000; ++t) {
        if(x*x + y*y > 4.0) return 0.0;
        float nx = x*x - y*y + a;
        float ny = 2.0*x*y + b;
        x = nx;
        y = ny;
    }

    return 1.0;
}

void main() {
    float v = 1.0 - mandelbrot(uv.x, uv.y);
    gl_FragColor = vec4(vec3(v), 1.0);
}

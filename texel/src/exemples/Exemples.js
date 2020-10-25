export class Exemples {
    static circle () {
        return `float circle(float radius, vec2 coord, vec2 pos) {
    float v = length(coord - pos) / radius;
    if(radius < 1.0) return smoothstep(0.5, 0.495 - (1.0 - radius) * 0.01, v);
    else return smoothstep(0.5, 0.495, v);
}

vec4 color(vec2 uv) {
    vec3 f = vec3(0.1, 0.1, 0.1);
    
    f = mix(f, vec3(1.0, 0.2, 0.1), circle(1.0, uv, vec2(0.5, 0.5)));
    f = mix(f, vec3(0.2, 1.0, 0.1), circle(0.2, uv, vec2(0.5, 0.8)));
    f = mix(f, vec3(0.1, 0.2, 1.0), circle(0.4, uv, vec2(0.3, 0.5)));
    f = mix(f, vec3(0.8, 0.8, 0.2), circle(0.4, uv, vec2(0.75, 0.24)));
    
    return vec4(f, 1.0);
}
`;
    }

    static mandelbrot() {
        return `const vec2 center = vec2(0.7, 0.0);
const float scale = 2.0;
const int iter = 200;

vec4 color(vec2 uv) {
    vec2 z, c;

    c.x = 1.3333 * (uv.x - 0.5) * scale - center.x;
    c.y = (uv.y - 0.5) * scale * 1.4 - center.y;

    int i = 0;
    z = c;
    for(int j = 0; j < iter; ++j) {
        ++i;
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;

        if((x * x + y * y) > 4.0) break;
        z.x = x;
        z.y = y;
    }

    return vec4(((i == iter ? 0.0 : float(i)) / 100.0), 0.0, 0.0, 1.0);
}        
`;
    }
}

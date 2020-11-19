export default [
    {
        name: 'texture',
        frag: `
        vec4 texture(TextureInfo buffer, vec2 uv) {
            uv.y = buffer.yInv == 0 ? uv.y : 1.0 - uv.y;
            return texture2D(buffer.sampler, uv);
        }`
    }
];

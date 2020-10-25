export class TexturesManager {
    static init() {
        TexturesManager.textures = new Map();
    }

    static registerTexture(texture, name) {
        TexturesManager.textures.set(name, texture);
    }

    static getTextureByName(name) {
        return TexturesManager.textures.get(name);
    }
}

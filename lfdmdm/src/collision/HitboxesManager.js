export class HitboxesManager {
    static init() {
        HitboxesManager.hitboxes = new Map();
    }

    static registerHitbox(hitbox, name) {
        HitboxesManager.hitboxes.set(name, hitbox);
    }

    static getHitboxByName(name) {
        return HitboxesManager.hitboxes.get(name);
    }
}

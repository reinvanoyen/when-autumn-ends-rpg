import ECS from 'tnt-ecs';
import * as PIXI from 'pixi.js';

export default class SpriteRenderingSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }

    test(entity) {
        return (entity.components.position && entity.components.sprite);
    }

    enter(entity) {
        entity.sprite = new PIXI.Sprite(PIXI.Texture.from(entity.components.sprite.src));
        entity.sprite.parentGroup = this.renderingSystem[entity.components.sprite.group];
        this.renderingSystem.root.addChild(entity.sprite);
    }

    exit(entity) {
        this.renderingSystem.root.removeChild(entity.sprite);
        delete entity.sprite;
    }

    update(entity) {

        let { position, sprite } = entity.components;

        entity.sprite.anchor.x = sprite.anchorX;
        entity.sprite.anchor.y = sprite.anchorY;
        entity.sprite.scale.x = sprite.scaleX;
        entity.sprite.scale.y = sprite.scaleY;
        entity.sprite.position.x = position.x;
        entity.sprite.position.y = position.y;
    }
}

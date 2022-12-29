import ECS from 'tnt-ecs';
import { Text } from 'pixi.js';

export default class TextRenderingSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }

    test(entity) {
        return (entity.components.position && entity.components.text);
    }

    enter(entity) {

        entity.text = new Text(entity.components.text.string, {
            fontFamily: 'Arial',
            fontSize: entity.components.text.size,
            fill: entity.components.text.color
        });

        entity.text.anchor.x = .5;
        entity.text.anchor.y = .5;

        this.renderingSystem.root.addChild(entity.text);
    }

    exit(entity) {
        this.renderingSystem.root.removeChild(entity.text);
        delete entity.text;
    }

    update(entity) {

        let { position, text } = entity.components;

        entity.text.x = position.x + text.offsetX;
        entity.text.y = position.y + text.offsetY;
        entity.text.text = text.string;
        entity.text.fontSize = text.size;
    }
}

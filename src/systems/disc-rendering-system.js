import ECS from 'tnt-ecs';
import { Graphics } from 'pixi.js';

export default class DiscRenderingSystem extends ECS.System {
    
    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }
    
    test(entity) {
        return (entity.components.position && entity.components.disc);
    }

    enter(entity) {
        entity.disc = new Graphics();
        this.renderingSystem.root.addChild(entity.disc);
    }

    exit(entity) {
        this.renderingSystem.root.removeChild(entity.disc);
        delete entity.disc;
    }

    update(entity) {
        
        let { position, disc } = entity.components;
        
        entity.disc.clear();
        entity.disc.beginFill(disc.color);
        entity.disc.drawCircle(position.x, position.y, disc.radius);
        entity.disc.endFill();
    }
}
import ECS from 'tnt-ecs';
import { Graphics } from 'pixi.js';

export default class ExplosionSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }

    test(entity) {
        return (entity.components.position && entity.components.explosion);
    }

    enter(entity) {
        entity.explosion = new Graphics();
        this.renderingSystem.root.addChild(entity.explosion);
    }

    exit(entity) {
        this.renderingSystem.root.removeChild(entity.explosion);
        delete entity.disc;
    }

    update(entity) {

        let { position, explosion } = entity.components;

        if (explosion.radius === explosion.currentRadius) {
            this.core.removeEntity(entity);
        }

        entity.explosion.clear();
        entity.explosion.beginFill(0xf14000);
        entity.explosion.drawCircle(position.x, position.y, explosion.currentRadius);
        entity.explosion.endFill();

        explosion.currentRadius = explosion.currentRadius + 5;
    }
}

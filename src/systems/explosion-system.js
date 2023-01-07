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
        entity.explosion.parentGroup = this.renderingSystem.activeGroup;
        entity.explosion.alpha = .2;
        entity.explosion2 = new Graphics();
        entity.explosion2.parentGroup = this.renderingSystem.activeGroup;
        entity.explosion2.alpha = .5;
        this.renderingSystem.root.addChild(entity.explosion);
        this.renderingSystem.root.addChild(entity.explosion2);
    }

    exit(entity) {
        this.renderingSystem.root.removeChild(entity.explosion);
        this.renderingSystem.root.removeChild(entity.explosion2);
        delete entity.explosion;
        delete entity.explosion2;
    }

    update(entity) {

        let { position, explosion } = entity.components;

        if (explosion.currentRadius > explosion.radius) {
            this.core.removeEntity(entity);
            return;
        }

        entity.explosion2.clear();
        entity.explosion2.beginFill(0xe8d000);
        entity.explosion2.drawCircle(position.x, position.y, explosion.currentRadius + 1);
        entity.explosion2.endFill();

        entity.explosion.clear();
        entity.explosion.beginFill(0xf14000);
        entity.explosion.drawCircle(position.x, position.y, explosion.currentRadius);
        entity.explosion.endFill();

        explosion.currentRadius = explosion.currentRadius + 10;
    }
}

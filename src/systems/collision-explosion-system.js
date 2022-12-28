import ECS from 'tnt-ecs';
import Position from "../components/position";
import Explosion from "../components/explosion";

export default class CollisionExplosionSystem extends ECS.System {

    test(entity) {
        return (entity.components.collisionExplosion && entity.components.collisionBox && entity.components.position);
    }

    enter(entity) {

    }

    exit(entity) {

    }

    update(entity) {

        let { collisionBox, position, collisionExplosion } = entity.components;

        if (collisionBox.entityCollision) {

            // We remove the entity
            this.core.removeEntity(entity);

            // We add the explosion
            let explosion = new ECS.Entity([
                new Position({
                    x: position.x,
                    y: position.y
                }),
                new Explosion({
                    radius: collisionExplosion.radius
                })
            ]);

            this.core.addEntity(explosion);
        }
    }
}

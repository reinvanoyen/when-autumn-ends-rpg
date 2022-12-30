import ECS from 'tnt-ecs';
import Position from "../components/position";
import Explosion from "../components/explosion";
import DealsDamage from "../components/deals-damage";
import CollisionBox from "../components/collision-box";
import SpatialAwareness from "../components/spatial-awareness";
import {vec2 as Vector2} from "gl-matrix";

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

            collisionBox.collidingEntities.forEach(entityId => {

                let collidingEntity = this.core.findEntityById(entityId);

                if (
                    collidingEntity &&
                    collidingEntity.components.tag &&
                    (
                        collidingEntity.components.tag.string === 'bullet' ||
                        collidingEntity.components.tag.string === 'pickup'
                    )
                ) {

                    // do nothing, it's another bullet

                } else {

                    // We remove the entity
                    this.core.removeEntity(entity);

                    // We add the explosion
                    let explosion = new ECS.Entity([
                        new Position({
                            x: position.x,
                            y: position.y
                        }),
                        new DealsDamage({
                            amount: collisionExplosion.damage
                        }),
                        new SpatialAwareness(),
                        new CollisionBox({
                            anchor: Vector2.fromValues(.5, .5),
                            width: collisionExplosion.radius,
                            height: collisionExplosion.radius
                        }),
                        new Explosion({
                            radius: collisionExplosion.radius
                        })
                    ]);

                    this.core.addEntity(explosion);
                }
            });
        }
    }
}

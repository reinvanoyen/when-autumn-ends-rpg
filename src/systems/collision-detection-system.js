import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

export default class CollisionDetectionSystem extends ECS.System {

    constructor(spatialHashingSystem) {
        super();
        this.spatialHashingSystem = spatialHashingSystem;
    }

    test(entity) {
        return (entity.components.spatialAwareness && entity.components.collisionBox && entity.components.position);
    }

    update(entity) {

        let {spatialAwareness, position, collisionBox} = entity.components;

        if (collisionBox.active) {

            // Check spatial hash buckets for collisions with other entities
            // Filter out double hashes
            let hashes = [
                spatialAwareness.topLeft,
                spatialAwareness.topRight,
                spatialAwareness.bottomRight,
                spatialAwareness.bottomLeft
            ].filter((value, index, array) => array.indexOf(value) === index);

            let entities = [];

            hashes.forEach((hash) => {
                entities = entities.concat(this.spatialHashingSystem.buckets[hash]);
            });

            entity.components.collisionBox.entityCollision = false;
            entity.components.collisionBox.collidingEntities = [];

            entities.forEach((otherEntity) => {

                // AABB collision detection
                if (
                    entity.id !== otherEntity.id &&
                    collisionBox.topRight[0] > otherEntity.components.collisionBox.topLeft[0] &&
                    collisionBox.topLeft[0] < otherEntity.components.collisionBox.topRight[0] &&
                    collisionBox.bottomLeft[1] > otherEntity.components.collisionBox.topLeft[1] &&
                    collisionBox.topLeft[1] < otherEntity.components.collisionBox.bottomLeft[1]
                ) {
                    // The entity collided with another entity
                    entity.components.collisionBox.entityCollision = true;
                    entity.components.collisionBox.collidingEntities.push(otherEntity.getId());
                }
            });

            // If there's no collision, we store the current position for later use
            if (! entity.components.collisionBox.entityCollision) {
                entity.components.collisionBox.lastNonCollidingPosition = Vector2.fromValues(
                    entity.components.position.x,
                    entity.components.position.y
                );
            }
        }
    }
}

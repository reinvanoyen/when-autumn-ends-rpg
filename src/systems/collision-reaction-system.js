import ECS from 'tnt-ecs';

export default class CollisionReactionSystem extends ECS.System {

    test(entity) {
        return (entity.components.collisionReaction && entity.components.collisionBox && entity.components.position);
    }

    enter(entity) {

    }

    exit(entity) {

    }

    update(entity) {

        let { collisionBox, position } = entity.components;

        if (collisionBox.entityCollision && collisionBox.lastNonCollidingPosition) {

            position.x = collisionBox.lastNonCollidingPosition[0];
            position.y = collisionBox.lastNonCollidingPosition[1];

            collisionBox.entityCollision = false;
        }
    }
}

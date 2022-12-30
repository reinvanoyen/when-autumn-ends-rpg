import ECS from 'tnt-ecs';

export default class PickupSystem extends ECS.System {

    test(entity) {
        return (entity.components.collisionBox && entity.components.pickup);
    }

    enter(entity) {

    }

    exit(entity) {

    }

    update(entity) {

        let { collisionBox, pickup } = entity.components;

        if (collisionBox.entityCollision) {

            collisionBox.collidingEntities.forEach(entityId => {

                let collidingEntity = this.core.findEntityById(entityId);

                if (
                    collidingEntity &&
                    collidingEntity.components.tag &&
                    collidingEntity.components.tag.string === 'player'
                ) {
                    pickup.add.forEach(component => {
                        collidingEntity.addComponent(component);
                    });

                    this.core.removeEntity(entity);
                }
            });

        }
    }
}

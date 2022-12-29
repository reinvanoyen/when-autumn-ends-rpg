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

                let entity = this.core.findEntityById(entityId);

                if (entity) {
                    pickup.add.forEach(component => {
                        entity.addComponent(component);
                    });
                }
            });

            this.core.removeEntity(entity);
        }
    }
}

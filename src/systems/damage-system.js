import ECS from 'tnt-ecs';

export default class DamageSystem extends ECS.System {

    test(entity) {
        return (entity.components.collisionBox && entity.components.dealsDamage);
    }

    enter(entity) {

    }

    exit(entity) {

    }

    update(entity) {

        let { collisionBox, dealsDamage } = entity.components;

        if (collisionBox.entityCollision) {

            collisionBox.collidingEntities.forEach(entityId => {

                let entity = this.core.findEntityById(entityId);

                if (entity && entity.components.health) {
                    entity.components.health.amount = entity.components.health.amount - dealsDamage.amount;
                }
            });
        }
    }
}

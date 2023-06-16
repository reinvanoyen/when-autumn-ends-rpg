import ECS from 'tnt-ecs';
import Messages from "../core/messages";

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
                    pickup.incrementValue.forEach(data => {
                        let [component, property, value] = data;
                        if (collidingEntity.components[component]) {
                            collidingEntity.components[component][property] = collidingEntity.components[component][property] + value;
                        }
                    });

                    pickup.add.forEach(component => {
                        collidingEntity.addComponent(component);
                    });

                    Messages.trigger('pickup');
                    this.core.removeEntity(entity);
                }
            });

        }
    }
}

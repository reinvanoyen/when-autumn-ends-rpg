import ECS from 'tnt-ecs';

export default class HealthSystem extends ECS.System {

    test(entity) {
        return (entity.components.health);
    }

    enter(entity) {

    }

    exit(entity) {

    }

    update(entity) {

        let { health } = entity.components;

        if (health.amount <= 0) {
            this.core.removeEntity(entity);
        }
    }
}

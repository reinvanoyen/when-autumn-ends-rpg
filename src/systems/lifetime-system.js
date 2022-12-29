import ECS from 'tnt-ecs';

export default class LifetimeSystem extends ECS.System {

    test(entity) {
        return entity.components.lifetime;
    }

    enter(entity) {
        entity.lifetime = 0;
    }

    exit(entity) {
        delete entity.lifetime;
    }

    update(entity) {

        let { lifetime } = entity.components;

        entity.lifetime++;

        if (lifetime.amount <= entity.lifetime) {
            this.core.removeEntity(entity);
        }
    }
}

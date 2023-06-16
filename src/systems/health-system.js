import ECS from 'tnt-ecs';
import enemy from "../assemblage/enemy";
import Messages from "../core/messages";

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

            if (
                entity.components.tag &&
                entity.components.tag.string === 'player'
            ) {
                Messages.trigger('player.death');
            } else if (
                entity.components.tag &&
                entity.components.tag.string === 'enemy'
            ) {
                Messages.trigger('enemy.death');
            }

            this.core.removeEntity(entity);
        }
    }
}

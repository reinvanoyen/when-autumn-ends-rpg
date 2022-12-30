import ECS from 'tnt-ecs';
import Target from "../components/target";

export default class FollowSystem extends ECS.System {

    test(entity) {
        return entity.components.follow;
    }

    enter(entity) {

    }

    exit(entity) {
        //entity.removeComponent('target');
    }

    update(entity) {

        let { follow } = entity.components;

        if (follow.entity) {

            let followEntity = this.core.findEntityById(follow.entity);

            if (followEntity && followEntity.components.position) {
                entity.addComponent(new Target({
                    x: followEntity.components.position.x,
                    y: followEntity.components.position.y
                }));
            }
        }
    }
}

import ECS from 'tnt-ecs';
import {vec2 as Vector2} from "gl-matrix";

export default class AiControlSystem extends ECS.System {

    constructor() {
        super(100);
    }

    test(entity) {
        return entity.components.aiController && entity.components.position;
    }

    enter(entity) {

    }

    exit(entity) {
        //entity.removeComponent('target');
    }

    update(entity) {

        let { aiController } = entity.components;

        if (aiController.entity) {

            let targetEntity = this.core.findEntityById(aiController.entity);

            if (targetEntity) {

                let dist = Vector2.distance(
                    Vector2.fromValues(entity.components.position.x, entity.components.position.y),
                    Vector2.fromValues(targetEntity.components.position.x, targetEntity.components.position.y)
                );

                if (dist < 300) {
                    aiController.mouseDown = true;
                    aiController.mouseX = targetEntity.components.position.x;
                    aiController.mouseY = targetEntity.components.position.y;
                } else {
                    aiController.mouseDown = false;
                }

                return;
            }

            aiController.mouseDown = false;
        }
    }
}

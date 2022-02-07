"use strict";

import ECS from 'tnt-ecs';

export default class WalkingBehaviorSystem extends ECS.System {

    test(entity) {
        return (entity.components.walkingBehavior && entity.components.velocity);
    }

    enter(entity) {
        //
    }

    update(entity) {
        
        let { walkingBehavior, velocity } = entity.components;
        
        if (velocity) {
            velocity.y = walkingBehavior.y;
            velocity.x = walkingBehavior.x;
        }
    }
}
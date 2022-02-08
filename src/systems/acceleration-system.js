"use strict";

import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

export default class AccelerationSystem extends ECS.System {

    test(entity) {
        return entity.components.velocity;
    }

    update(entity) {

        let { velocity } = entity.components;

        let velocityVec2 = Vector2.fromValues(velocity.x, velocity.y);
        let maxVelocityVec2 = Vector2.fromValues(velocity.max, velocity.max);
        let accelerationVec2 = Vector2.fromValues(velocity.accelerationX, velocity.accelerationY);
        let forceVec2 = Vector2.fromValues(velocity.forceX, velocity.forceY);

        Vector2.scale(accelerationVec2, forceVec2, velocity.mass);
        Vector2.add(velocityVec2, velocityVec2, accelerationVec2);

        // Clamp velocity
        Vector2.min(velocityVec2, velocityVec2, maxVelocityVec2);
        
        let reversedMaxVelocity = Vector2.create();
        
        Vector2.negate(reversedMaxVelocity, maxVelocityVec2);
        Vector2.max(velocityVec2, velocityVec2, reversedMaxVelocity);
        Vector2.min(velocityVec2, velocityVec2, maxVelocityVec2);
        
        velocity.accelerationX = accelerationVec2[0];
        velocity.accelerationY = accelerationVec2[1];
        
        velocity.x = velocityVec2[0];
        velocity.y = velocityVec2[1];
    }
}
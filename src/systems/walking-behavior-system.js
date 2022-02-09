"use strict";

import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

export default class WalkingBehaviorSystem extends ECS.System {

    test(entity) {
        return (entity.components.walkingBehavior && entity.components.velocity);
    }

    enter(entity) {
        //
    }

    update(entity) {
        
        let { walkingBehavior, velocity } = entity.components;
        
        if (entity.components.animatedSprite) {
            entity.components.animatedSprite.animation = (walkingBehavior.isWalking ? 'walk' : 'idle');
            entity.components.animatedSprite.speed = (walkingBehavior.isWalking ? .2 : .05);
            entity.components.animatedSprite.scaleX = 1;
            if (walkingBehavior.x < 0) {
                entity.components.animatedSprite.scaleX = -1;
            }
        }
        
        if (velocity) {
            
            if (walkingBehavior.isWalking) {
                
                let forceVec2 = Vector2.fromValues(velocity.forceX, velocity.forceY);
                
                Vector2.add(forceVec2, forceVec2, Vector2.fromValues(walkingBehavior.x, walkingBehavior.y));
                
                velocity.forceX = forceVec2[0];
                velocity.forceY = forceVec2[1];
                
                if (walkingBehavior.x === 0) {
                    let lerpedVelocity = Vector2.fromValues(velocity.x, velocity.y);
                    Vector2.lerp(lerpedVelocity, lerpedVelocity, Vector2.fromValues(0, 0), .5);
                    velocity.forceX = 0;
                    velocity.x = lerpedVelocity[0];
                }

                if (walkingBehavior.y === 0) {
                    let lerpedVelocity = Vector2.fromValues(velocity.x, velocity.y);
                    Vector2.lerp(lerpedVelocity, lerpedVelocity, Vector2.fromValues(0, 0), .5);
                    velocity.forceY = 0;
                    velocity.y = lerpedVelocity[1];
                }
                
            } else {
                
                let lerpedVelocity = Vector2.fromValues(velocity.x, velocity.y);
                Vector2.lerp(lerpedVelocity, lerpedVelocity, Vector2.fromValues(0, 0), .5);
                
                velocity.forceX = 0;
                velocity.forceY = 0;
                
                velocity.x = lerpedVelocity[0];
                velocity.y = lerpedVelocity[1];
            }
        }
    }
}
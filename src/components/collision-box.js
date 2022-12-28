"use strict";

import ECS from "tnt-ecs";

const Vector2 = require('gl-matrix').vec2;

export default class CollisionBox extends ECS.Component {

    getName() {
        return 'collisionBox';
    }

    getDefaults() {
        return {
            // Setting this to false makes it observable for other entities, but doesn't actively check for collisions itself
            active: true,
            width: 50,
            height: 50,
            anchor: Vector2.fromValues(0.5, 1),
            topLeft: Vector2.fromValues(0.0, 0.0),
            topRight: Vector2.fromValues(0.0, 0.0),
            bottomRight: Vector2.fromValues(0.0, 0.0),
            bottomLeft: Vector2.fromValues(0.0, 0.0),
            lastNonCollidingPosition: null,
            entityCollision: false,
            collidingEntities: []
        };
    };
}
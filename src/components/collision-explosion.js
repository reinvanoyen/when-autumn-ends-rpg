"use strict";

import ECS from 'tnt-ecs';

export default class CollisionExplosion extends ECS.Component {

    getName() {
        return 'collisionExplosion';
    }

    getDefaults() {
        return {
            radius: 100,
            damage: 0
        };
    }
}

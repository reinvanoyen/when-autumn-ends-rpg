"use strict";

import ECS from 'tnt-ecs';

export default class CollisionReaction extends ECS.Component {

    getName() {
        return 'collisionReaction';
    }

    getDefaults() {
        return {};
    }
}

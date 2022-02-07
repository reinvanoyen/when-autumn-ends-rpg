"use strict";

import ECS from 'tnt-ecs';

export default class WalkingBehavior extends ECS.Component {

    getName() {
        return 'walkingBehavior';
    }

    getDefaults() {
        return {
            isWalking: false,
            x: 0,
            y: 0
        };
    }
}
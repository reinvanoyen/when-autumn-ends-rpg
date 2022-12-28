"use strict";

import ECS from 'tnt-ecs';

export default class Explosion extends ECS.Component {

    getName() {
        return 'explosion';
    }

    getDefaults() {
        return {
            radius: 25,
            currentRadius: 0
        };
    }
}

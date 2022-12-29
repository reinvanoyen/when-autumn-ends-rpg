"use strict";

import ECS from 'tnt-ecs';

export default class Velocity extends ECS.Component {

    getName() {
        return 'velocity';
    }

    getDefaults() {
        return {
            x: 0,
            y: 0,
            max: 20,
            forceX: 0,
            forceY: 0,
            mass: .2,
            accelerationX: 0,
            accelerationY: 0
        };
    }
}

"use strict";

import ECS from 'tnt-ecs';

export default class DealsDamage extends ECS.Component {

    getName() {
        return 'dealsDamage';
    }

    getDefaults() {
        return {
            amount: 20
        };
    }
}

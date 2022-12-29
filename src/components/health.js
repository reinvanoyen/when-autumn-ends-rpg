"use strict";

import ECS from 'tnt-ecs';

export default class Health extends ECS.Component {

    getName() {
        return 'health';
    }

    getDefaults() {
        return {
            amount: 100
        };
    }
}

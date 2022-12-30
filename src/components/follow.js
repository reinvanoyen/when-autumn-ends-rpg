"use strict";

import ECS from 'tnt-ecs';

export default class Follow extends ECS.Component {

    getName() {
        return 'follow';
    }

    getDefaults() {
        return {
            entity: null
        };
    }
}

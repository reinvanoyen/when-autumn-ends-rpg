"use strict";

import ECS from 'tnt-ecs';

export default class Tag extends ECS.Component {

    getName() {
        return 'tag';
    }

    getDefaults() {
        return {
            string: ''
        };
    }
}

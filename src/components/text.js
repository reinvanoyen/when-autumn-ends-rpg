"use strict";

import ECS from 'tnt-ecs';

export default class Text extends ECS.Component {

    getName() {
        return 'text';
    }

    getDefaults() {
        return {
            string: '',
            color: 0xffffff,
            size: 20,
            offsetX: 0,
            offsetY: 0
        };
    }
}

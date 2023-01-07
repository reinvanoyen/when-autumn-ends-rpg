"use strict";

import ECS from 'tnt-ecs';

export default class Sprite extends ECS.Component {

    getName() {
        return 'sprite';
    }

    getDefaults() {
        return {
            src: '',
            anchorX: .5,
            anchorY: 1,
            scaleX: 1,
            scaleY: 1,
            group: 'activeGroup'
        };
    }
}

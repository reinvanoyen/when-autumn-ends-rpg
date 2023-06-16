"use strict";

import ECS from 'tnt-ecs';

export default class AiController extends ECS.Component {

    getName() {
        return 'aiController';
    }

    getDefaults() {
        return {
            entity: null,
            keyUp: false,
            keyRight: false,
            keyDown: false,
            keyLeft: false,
            keySpace: false,
            mouseDown: false,
            mouseX: null,
            mouseY: null
        }
    }
}

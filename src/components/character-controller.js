"use strict";

import ECS from 'tnt-ecs';

export default class CharacterController extends ECS.Component {

    getName() {
        return 'controller';
    }
    
    getDefaults() {
        return {
            keyUp: false,
            keyRight: false,
            keyDown: false,
            keyLeft: false,
            keySpace: false
        }
    }
}
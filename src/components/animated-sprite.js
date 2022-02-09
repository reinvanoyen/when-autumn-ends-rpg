"use strict";

import ECS from 'tnt-ecs';

export default class AnimatedSprite extends ECS.Component {

    getName() {
        return 'animatedSprite';
    }

    getDefaults() {
        return {
            src: 'assets/animations/fox.json',
            animation: 'idle',
            speed: .1,
            anchorX: .5,
            anchorY: 1,
            scaleX: 1,
            scaleY: 1
        };
    }
}
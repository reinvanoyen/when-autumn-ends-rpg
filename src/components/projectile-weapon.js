"use strict";

import ECS from 'tnt-ecs';

export default class ProjectileWeapon extends ECS.Component {

    getName() {
        return 'projectileWeapon';
    }

    getDefaults() {
        return {
            offsetX: 0,
            offsetY: 0,
            velocity: 30,
            cooldown: 10,
            currentCooldown: 0
        };
    }
}

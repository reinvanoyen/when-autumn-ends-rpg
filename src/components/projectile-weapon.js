"use strict";

import ECS from 'tnt-ecs';

export default class ProjectileWeapon extends ECS.Component {

    getName() {
        return 'projectileWeapon';
    }

    getDefaults() {
        return {
            spread: 0,
            color: 0xf14000,
            offsetX: 0,
            offsetY: 0,
            projectileAmount: 1,
            lifetime: 1000,
            velocity: 30,
            cooldown: 5,
            currentCooldown: 0,
            damage: 10,
            size: 6,
            aoe: 20,
            aoeDamage: 0
        };
    }
}

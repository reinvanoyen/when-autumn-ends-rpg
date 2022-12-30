"use strict";

import ECS from "tnt-ecs";
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import CollisionBox from "../components/collision-box";
import ProjectileWeapon from "../components/projectile-weapon";
import Sprite from "../components/sprite";
import Pickup from "../components/pickup";
import Tag from "../components/tag";
const Vector2 = require('gl-matrix').vec2;

export default function shotgun(x, y) {
    return new ECS.Entity([
        new Tag({string: 'pickup'}),
        new Sprite({
            anchorX: .5,
            anchorY: .5,
            src: 'assets/shotgun.png'
        }),
        new SpatialAwareness(),
        new CollisionBox({
            anchor: Vector2.fromValues(.5, .5),
            width: 32,
            height: 12
        }),
        new Position({
            x: x + 32,
            y: y + 32
        }),
        new Pickup({
            add: [
                new ProjectileWeapon({
                    spread: 30,
                    velocity: 30,
                    aoe: 10,
                    lifetime: 15,
                    size: 5,
                    color: 0x9b0000,
                    cooldown: 50,
                    damage: 20,
                    projectileAmount: 5
                })
            ]
        })
    ]);
};

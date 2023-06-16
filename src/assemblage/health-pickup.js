"use strict";

import ECS from "tnt-ecs";
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import CollisionBox from "../components/collision-box";
import ProjectileWeapon from "../components/projectile-weapon";
import Sprite from "../components/sprite";
import Pickup from "../components/pickup";
import Tag from "../components/tag";
import Health from "../components/health";
const Vector2 = require('gl-matrix').vec2;

export default function healthPickup(x, y) {
    return new ECS.Entity([
        new Tag({string: 'pickup'}),
        new Sprite({
            anchorX: 0,
            anchorY: 0,
            src: 'assets/grass.png'
        }),
        new SpatialAwareness(),
        new CollisionBox({
            anchor: Vector2.fromValues(0, 0),
            width: 64,
            height: 64
        }),
        new Position({
            x: x,
            y: y
        }),
        new Pickup({
            incrementValue: [
                ['disc', 'radius', 1],
                ['health', 'amount', 50]
            ]
        })
    ]);
};

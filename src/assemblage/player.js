"use strict";

import ECS from "tnt-ecs";
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import Velocity from "../components/velocity";
import CollisionReaction from "../components/collision-reaction";
import CollisionBox from "../components/collision-box";
import Camera from "../components/camera";
import CharacterController from "../components/character-controller";
import WalkingBehavior from "../components/walking-behavior";
import ProjectileWeapon from "../components/projectile-weapon";
import Disc from "../components/disc";
const Vector2 = require('gl-matrix').vec2;

export default function player() {
    return new ECS.Entity([
        new Disc({
            radius: 10
        }),
        new ProjectileWeapon({
            offsetX: 20
        }),
        new SpatialAwareness(),
        new Position(),
        new Velocity(),
        new CollisionReaction(),
        new CollisionBox({
            anchor: Vector2.fromValues(.5, .5),
            width: 6,
            height: 6
        }),
        new Camera(),
        new CharacterController(),
        new WalkingBehavior()
    ]);
};

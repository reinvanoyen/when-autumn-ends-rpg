"use strict";

import ECS from "tnt-ecs";
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import Velocity from "../components/velocity";
import AnimatedSprite from "../components/animated-sprite";
import CollisionReaction from "../components/collision-reaction";
import CollisionBox from "../components/collision-box";
import WalkingBehavior from "../components/walking-behavior";
const Vector2 = require('gl-matrix').vec2;

export default function npc() {
    return new ECS.Entity([
        new SpatialAwareness(),
        new Position(),
        new Velocity(),
        new AnimatedSprite(),
        new CollisionReaction(),
        new CollisionBox({
            anchor: Vector2.fromValues(0, 1),
            width: 35,
            height: 10
        }),
        new WalkingBehavior()
    ]);
};
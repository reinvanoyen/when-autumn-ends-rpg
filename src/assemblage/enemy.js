"use strict";

import ECS from "tnt-ecs";
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import Velocity from "../components/velocity";
import CollisionReaction from "../components/collision-reaction";
import CollisionBox from "../components/collision-box";
import WalkingBehavior from "../components/walking-behavior";
import Disc from "../components/disc";
import Health from "../components/health";
import Tag from "../components/tag";
import Target from "../components/target";
import math from "../util/math";
import Follow from "../components/follow";
const Vector2 = require('gl-matrix').vec2;

export default function enemy(followEntity) {

    return new ECS.Entity([
        new Tag({string: 'enemy'}),
        new Follow({entity: followEntity}),
        new Position({x: math.randBetween(0, 3000), y: math.randBetween(0, 3000)}),
        new Velocity(),
        new Target({x: math.randBetween(0, 3000), y: math.randBetween(0, 3000)}),
        new Disc({radius: 10, color: 0xf14000}),
        new Health(),
        new SpatialAwareness(),
        new CollisionReaction(),
        new CollisionBox({
            anchor: Vector2.fromValues(.5, .5),
            width: 20,
            height: 20
        }),
        new WalkingBehavior()
    ]);
};

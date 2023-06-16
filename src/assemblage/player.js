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
import Disc from "../components/disc";
import Health from "../components/health";
import Tag from "../components/tag";
const Vector2 = require('gl-matrix').vec2;

export default function player(x, y) {
    return new ECS.Entity([
        new Tag({string: 'player'}),
        new Disc({radius: 10}),
        new Health({amount: 100}),
        new SpatialAwareness(),
        new Position({x, y}),
        new Velocity(),
        new CollisionReaction(),
        new CollisionBox({
            anchor: Vector2.fromValues(.5, .5),
            width: 20,
            height: 20
        }),
        new Camera(),
        new CharacterController(),
        new WalkingBehavior()
    ]);
};

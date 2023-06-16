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
import Follow from "../components/follow";
import ProjectileWeapon from "../components/projectile-weapon";
import AiController from "../components/ai-controller";
import projectileWeapon from "./projectile-weapon";
const Vector2 = require('gl-matrix').vec2;

export default function enemy(x, y, followEntity) {

    return new ECS.Entity([
        new Tag({string: 'enemy'}),
        new Follow({entity: followEntity}),
        new AiController({entity: followEntity}),
        new Position({x, y}),
        new Target({x, y}),
        new Velocity(),
        new Disc({radius: 10, color: 0xf14000}),
        new Health({health: 500}),
        new SpatialAwareness(),
        new CollisionReaction(),
        new CollisionBox({
            anchor: Vector2.fromValues(.5, .5),
            width: 20,
            height: 20
        }),
        projectileWeapon(),
    ]);
};

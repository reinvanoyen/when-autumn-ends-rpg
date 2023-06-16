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
import math from "../util/math";
import smg from "./smg";
import shotgun from "./shotgun";
import rpg from "./rpg";
import assaultRifle from "./assault-rifle";
const Vector2 = require('gl-matrix').vec2;

export default function projectileWeapon() {

    let item = math.randFromArray(['smg', 'shotgun', 'rpg', 'assaultRifle']);

    if (item === 'smg') {
        return new ProjectileWeapon({
            aoe: 5,
            size: 2,
            color: 0x000000,
            cooldown: 3,
            damage: 25
        });
    } else if (item === 'shotgun') {
        return new ProjectileWeapon({
            spread: 30,
            velocity: 30,
            aoe: 10,
            lifetime: 15,
            size: 5,
            color: 0x9b0000,
            cooldown: 50,
            damage: 20,
            projectileAmount: 5
        });
    } else if (item === 'rpg') {
        return new ProjectileWeapon({
            velocity: 10,
            size: 10,
            color: 0x9b0000,
            cooldown: 50,
            damage: 75,
            aoe: 75,
            aoeDamage: 20
        });
    } else if (item === 'assaultRifle') {
        return new ProjectileWeapon({
            aoe: 5,
            size: 3,
            color: 0x000000,
            cooldown: 8,
            damage: 50
        });
    }
};

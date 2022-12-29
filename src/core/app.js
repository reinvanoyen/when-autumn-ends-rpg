import ECS from 'tnt-ecs';
import { Ticker } from 'pixi.js'
import Messages from "./messages";
import * as PIXI from 'pixi.js';
const Vector2 = require('gl-matrix').vec2;

// Systems
import DiscRenderingSystem from "../systems/disc-rendering-system";
import RenderingSystem from "../systems/rendering-system";
import TextRenderingSystem from "../systems/text-rendering-system";
import LineRenderingSystem from "../systems/line-rendering-system";
import SpriteRenderingSystem from "../systems/sprite-rendering-system";
import CameraSystem from "../systems/camera-system";
import TimeSystem from "../systems/time-system";

// Components
import Position from "../components/position";
import Disc from "../components/disc";
import Camera from "../components/camera";
import Sprite from "../components/sprite";
import MovementSystem from "../systems/movement-system";
import Velocity from "../components/velocity";
import CharacterController from "../components/character-controller";

// Util
import math from "../util/math";
import ControllerSystem from "../systems/controller-system";
import WalkingBehavior from "../components/walking-behavior";
import WalkingBehaviorSystem from "../systems/walking-behavior-system";
import AccelerationSystem from "../systems/acceleration-system";
import AnimationRenderingSystem from "../systems/animation-rendering-system";
import AnimatedSprite from "../components/animated-sprite";
import Debug from "../components/debug";
import CollisionBox from "../components/collision-box";
import DebugSystem from "../systems/debug-system";
import CollisionDetectionSystem from "../systems/collision-detection-system";
import SpatialAwareness from "../components/spatial-awareness";
import SpatialHashingSystem from "../systems/spatial-hashing-system";
import CollisionPositionSystem from "../systems/collision-position-system";
import CollisionReactionSystem from "../systems/collision-reaction-system";
import CollisionReaction from "../components/collision-reaction";
import Tilemap from "../components/tilemap";
import TilemapSystem from "../systems/tilemap-system";
import WorldChunkSystem from "../systems/world-chunk-system";

// Assemblages
import player from "../assemblage/player";
import npc from "../assemblage/npc";
import ProjectileWeaponSystem from "../systems/projectile-weapon-system";
import CollisionExplosionSystem from "../systems/collision-explosion-system";
import ExplosionSystem from "../systems/explosion-system";
import CollisionExplosion from "../components/collision-explosion";
import DamageSystem from "../systems/damage-system";
import HealthSystem from "../systems/health-system";
import Pickup from "../components/pickup";
import PickupSystem from "../systems/pickup-system";
import ProjectileWeapon from "../components/projectile-weapon";
import LifetimeSystem from "../systems/lifetime-system";

export default class App {

    constructor() {
        // init ECS Core
        this.ecs = new ECS.Core();

        // install ticker
        this.ticker = new Ticker();
        this.ticker.stop();
    }

    bind() {
        // Logic
        this.ecs.addSystem(new WalkingBehaviorSystem());
        this.ecs.addSystem(new AccelerationSystem());
        this.ecs.addSystem(new MovementSystem());
        this.ecs.addSystem(new TilemapSystem());

        // Rendering
        let renderingSystem = new RenderingSystem();
        this.ecs.addSystem(renderingSystem);
        this.ecs.addSystem(new CameraSystem(renderingSystem));
        this.ecs.addSystem(new DiscRenderingSystem(renderingSystem));
        this.ecs.addSystem(new AnimationRenderingSystem(renderingSystem));
        this.ecs.addSystem(new SpriteRenderingSystem(renderingSystem));
        this.ecs.addSystem(new TextRenderingSystem(renderingSystem));
        this.ecs.addSystem(new LineRenderingSystem(renderingSystem));
        this.ecs.addSystem(new TimeSystem(renderingSystem));
        this.ecs.addSystem(new DebugSystem(renderingSystem));
        this.ecs.addSystem(new ExplosionSystem(renderingSystem));

        let spatialHashingSystem = new SpatialHashingSystem();
        this.ecs.addSystem(spatialHashingSystem);
        this.ecs.addSystem(new CollisionDetectionSystem(spatialHashingSystem));
        this.ecs.addSystem(new CollisionPositionSystem());
        this.ecs.addSystem(new CollisionReactionSystem());
        this.ecs.addSystem(new WorldChunkSystem());
        this.ecs.addSystem(new ProjectileWeaponSystem());
        this.ecs.addSystem(new CollisionExplosionSystem());
        this.ecs.addSystem(new DamageSystem());
        this.ecs.addSystem(new HealthSystem());
        this.ecs.addSystem(new PickupSystem());
        this.ecs.addSystem(new LifetimeSystem());
        this.ecs.addSystem(new ControllerSystem());

        this.ecs.addEntity(player());

        let debug = false;
        document.addEventListener('keypress', e => {
            if (e.code === 'KeyE') {
                if (debug) {
                    this.ecs.entities.forEach(e => e.removeComponent('debug'));
                    debug = ! debug;
                } else {
                    this.ecs.entities.forEach(e => e.addComponent(new Debug()));
                    debug = ! debug;
                }
            }
        })
    }

    start() {
        this.ticker.add(deltaTime => {
            Messages.process();
            this.ecs.update();
        });
        this.ticker.start();
    }
}

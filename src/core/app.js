import ECS from 'tnt-ecs';
import { Ticker } from 'pixi.js'
import Messages from "./messages";

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
        this.ecs.addSystem(new MovementSystem());
        this.ecs.addSystem(new AccelerationSystem());
        this.ecs.addSystem(new ControllerSystem());
        this.ecs.addSystem(new WalkingBehaviorSystem());
        
        // Rendering
        let renderingSystem = new RenderingSystem();
        this.ecs.addSystem(renderingSystem);
        this.ecs.addSystem(new CameraSystem(renderingSystem));
        this.ecs.addSystem(new TimeSystem(renderingSystem.root));
        this.ecs.addSystem(new DiscRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new SpriteRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new TextRenderingSystem(renderingSystem.root));
        this.ecs.addSystem(new LineRenderingSystem(renderingSystem.root));

        for (let i = 0; i < 200; i++) {
            this.ecs.addEntity(new ECS.Entity([
                new Sprite({
                    src: './assets/tiles.png'
                }),
                new Position({
                    x: math.randBetweenPosNeg(-1000, 1000),
                    y: math.randBetweenPosNeg(-1000, 1000)
                })
            ]));
        }
        
        for (let i = 0; i < 200; i++) {
            this.ecs.addEntity(new ECS.Entity([
                new Disc(),
                new Sprite({
                    src: './assets/house-1.png'
                }),
                new Position({
                    x: math.randBetweenPosNeg(-1000, 1000),
                    y: math.randBetweenPosNeg(-1000, 1000)
                })
            ]));
        }

        let camera = new ECS.Entity([
            new Sprite({
                src: './assets/character.png'
            }),
            new Camera(),
            new Position(),
            new Velocity(),
            new CharacterController(),
            new WalkingBehavior()
        ]);

        this.ecs.addEntity(camera);
    }
    
    start() {
        this.ticker.add(deltaTime => {
            Messages.process();
            this.ecs.update();
        });
        this.ticker.start();
    }
}
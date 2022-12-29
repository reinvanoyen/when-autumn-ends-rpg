import ECS from 'tnt-ecs';
import * as PIXI from 'pixi.js';
import { Layer, Group, Stage } from '@pixi/layers';
import Messages from "../core/messages";

export default class RenderingSystem extends ECS.System {

    constructor() {

        super();

        // PIXI setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        // create app
        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            antialias: false,
            backgroundColor: 0x6c7e57,
            roundPixels: true
        });

        this.app.stage = new Stage();

        // install base container
        this.root = this.app.stage.addChild(new PIXI.Container());

        this.backGroup = new Group(1);
        this.activeGroup = new Group(2, true);
        this.activeGroup.on('sort', (sprite) => {
            sprite.zOrder = sprite.y;
        });
        this.frontGroup = new Group(3);

        this.app.stage.addChild(new Layer(this.backGroup));
        this.app.stage.addChild(new Layer(this.activeGroup));
        this.app.stage.addChild(new Layer(this.frontGroup));

        // add canvas to HTML document
        this.app.view.style.width = '100%';
        document.body.appendChild(this.app.view);

        // broadcast info about renderer
        Messages.trigger('renderer', {
            width: this.width,
            height: this.height
        });
    }
}

import ECS from 'tnt-ecs';
import { settings, SCALE_MODES, Application, Container } from 'pixi.js';
import Messages from "../core/messages";

export default class RenderingSystem extends ECS.System {

    constructor() {

        super();
        
        // PIXI setup
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        settings.SCALE_MODE = SCALE_MODES.NEAREST;

        // create app
        this.app = new Application({
            width: this.width,
            height: this.height,
            antialias: false,
            backgroundColor: 0x6c7e57,
            roundPixels: true
        });
        
        // install root container
        this.root = new Container();
        this.app.stage.addChild(this.root);
        
        this.active = new Container();
        this.app.stage.addChild(this.active);

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
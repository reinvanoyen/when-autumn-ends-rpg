import ECS from 'tnt-ecs';
import Messages from "../core/messages";

export default class ControllerSystem extends ECS.System {

    constructor() {
        super();

        this.camera = {
            x: 0,
            y: 0,
            offsetX: 0,
            offsetY: 0,
            zoom: 1
        };

        this.mouseMoveEvent = null;

        Messages.addListener('camera', e => {
            this.camera = e;
        });

        window.addEventListener('mousedown', e => {
            this.entities.forEach(entity => {
                entity.components.controller.mouseDown = true;
                entity.components.controller.mouseDown = true;
            });
        });

        window.addEventListener('mouseup', e => {
            this.entities.forEach(entity => {
                entity.components.controller.mouseDown = false;
                entity.components.controller.mouseDown = false;
            });
        });

        window.addEventListener('mousemove', e => {
            this.mouseMoveEvent = e;
        });

        window.addEventListener('keyup', e => {
            this.entities.forEach(entity => {
                if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                    entity.components.controller.keyUp = false;
                }
                if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                    entity.components.controller.keyDown = false;
                }
                if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                    entity.components.controller.keyLeft = false;
                }
                if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                    entity.components.controller.keyRight = false
                }
                if (e.code === 'Space') {
                    entity.components.controller.keySpace = false
                }
            });

        }, false);

        window.addEventListener('keydown', e => {
            this.entities.forEach(entity => {
                if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                    entity.components.controller.keyUp = true;
                }
                if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                    entity.components.controller.keyDown = true;
                }
                if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                    entity.components.controller.keyLeft = true;
                }
                if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                    entity.components.controller.keyRight = true
                }
                if (e.code === 'Space') {
                    entity.components.controller.keySpace = true
                }
            });
        }, false);
    }

    transformDomEvent(e) {
        return {
            localX: e.clientX,
            localY: e.clientY,
            worldX: (e.clientX - this.camera.x) / this.camera.zoom,
            worldY: (e.clientY - this.camera.y) / this.camera.zoom
        };
    }

    test(entity) {
        return (entity.components.controller);
    }

    update(entity) {

        let { controller, walkingBehavior } = entity.components;

        if (this.mouseMoveEvent) {
            let transformedMouseMoveEvent = this.transformDomEvent(this.mouseMoveEvent);
            controller.mouseX = transformedMouseMoveEvent.worldX;
            controller.mouseY = transformedMouseMoveEvent.worldY;
        }

        walkingBehavior.isWalking = false;
        walkingBehavior.y = 0;
        walkingBehavior.x = 0;

        if (walkingBehavior) {
            if (controller.keyUp) {
                walkingBehavior.isWalking = true;
                walkingBehavior.y = -1;
            }
            if (controller.keyDown) {
                walkingBehavior.isWalking = true;
                walkingBehavior.y = 1;
            }
            if (controller.keyRight) {
                walkingBehavior.isWalking = true;
                walkingBehavior.x = 1;
            }
            if (controller.keyLeft) {
                walkingBehavior.isWalking = true;
                walkingBehavior.x = -1;
            }
        }
    }
}

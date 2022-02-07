import ECS from 'tnt-ecs';

export default class ControllerSystem extends ECS.System {

    constructor() {
        super();

        window.addEventListener('keyup', e => {
            
            this.entities.forEach(entity => {
                if (e.code === 'ArrowUp') {
                    entity.components.controller.keyUp = false;
                }
                if (e.code === 'ArrowDown') {
                    entity.components.controller.keyDown = false;
                }
                if (e.code === 'ArrowLeft') {
                    entity.components.controller.keyLeft = false;
                }
                if (e.code === 'ArrowRight') {
                    entity.components.controller.keyRight = false
                }
                if (e.code === 'Space') {
                    entity.components.controller.keySpace = false
                }
            });
            
        }, false);
        
        window.addEventListener('keydown', e => {
            this.entities.forEach(entity => {
                if (e.code === 'ArrowUp') {
                    entity.components.controller.keyUp = true;
                }
                if (e.code === 'ArrowDown') {
                    entity.components.controller.keyDown = true;
                }
                if (e.code === 'ArrowLeft') {
                    entity.components.controller.keyLeft = true;
                }
                if (e.code === 'ArrowRight') {
                    entity.components.controller.keyRight = true
                }
                if (e.code === 'Space') {
                    entity.components.controller.keySpace = true
                }
            });
        }, false);
    }

    test(entity) {
        return (entity.components.controller);
    }
    
    update(entity) {
        
        let { controller, walkingBehavior, camera } = entity.components;
        
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
        
        if (camera && controller.keySpace) {
            camera.zoom += .1;
            if (camera.zoom > 10) {
                camera.zoom = .5;
            }
        }
    }
}
"use strict";

import ECS from 'tnt-ecs';

export default class CameraSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }

    test(entity) {
        return (entity.components.camera && entity.components.position);
    }

    enter(entity) {
        //
    }

    update(entity) {
        
        let {camera, position} = entity.components;

        this.renderingSystem.root.position.x = -position.x * camera.zoom + (this.renderingSystem.width / 2) + camera.offsetX;
        this.renderingSystem.root.position.y = -position.y * camera.zoom + (this.renderingSystem.height / 2) + camera.offsetY;
        
        this.renderingSystem.root.scale.x = camera.zoom;
        this.renderingSystem.root.scale.y = camera.zoom;
    }
}
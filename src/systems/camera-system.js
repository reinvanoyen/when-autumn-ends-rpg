"use strict";

import ECS from 'tnt-ecs';
import Messages from "../core/messages";
const Vector2 = require('gl-matrix').vec2;

export default class CameraSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
        this.prevPosition = null;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    test(entity) {
        return (entity.components.camera && entity.components.position);
    }

    enter(entity) {
        this.prevPosition = Vector2.fromValues(entity.components.position.x, entity.components.position.y);
    }

    update(entity) {

        let {camera, position} = entity.components;

        let cameraPositionVec2 = Vector2.fromValues(position.x, position.y);
        let cameraTargetPositionVec2 = Vector2.fromValues(position.x, position.y);
        Vector2.lerp(cameraPositionVec2, this.prevPosition, cameraTargetPositionVec2, .05);

        this.renderingSystem.root.position.x = -cameraPositionVec2[0] * camera.zoom + (this.renderingSystem.width / 2) + camera.offsetX;
        this.renderingSystem.root.position.y = -cameraPositionVec2[1] * camera.zoom + (this.renderingSystem.height / 2) + camera.offsetY;

        this.renderingSystem.root.scale.x = camera.zoom;
        this.renderingSystem.root.scale.y = camera.zoom;

        this.prevPosition[0] = cameraPositionVec2[0];
        this.prevPosition[1] = cameraPositionVec2[1];

        Messages.trigger('camera', {
            x: -cameraPositionVec2[0] * camera.zoom + (this.width / 2),
            y: -cameraPositionVec2[1] * camera.zoom + (this.height / 2),
            offsetX: camera.offsetX,
            offsetY: camera.offsetY,
            zoom: camera.zoom
        });
    }
}

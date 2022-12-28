"use strict";

import ECS from 'tnt-ecs';
import Ambient from "../rendering/filters/ambient";
import WorldTime from "../world/world-time";

export default class TimeSystem extends ECS.System {

    constructor(renderingSystem, frequency= 15) {

        super(frequency);

        this.renderingSystem = renderingSystem;

        this.worldTime = new WorldTime(10, 1);

        this.timeAmbientColorFilter = new Ambient();
        this.dayAmbientColorFilter = new Ambient();

        this.renderingSystem.app.stage.filters = [this.timeAmbientColorFilter, this.dayAmbientColorFilter];
    }

    test(entity) {
        return false;
    }

    postUpdate() {

        this.worldTime.tick();

        this.timeAmbientColorFilter.ambientColor = this.worldTime.getTimeAmbientColor();
        this.dayAmbientColorFilter.ambientColor = this.worldTime.getDayAmbientColor();
    }
}

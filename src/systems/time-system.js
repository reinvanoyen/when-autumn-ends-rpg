"use strict";

import ECS from 'tnt-ecs';
import Ambient from "../rendering/filters/ambient";
import WorldTime from "../world/world-time";

export default class TimeSystem extends ECS.System {

    constructor(root, frequency= 15) {

        super(frequency);

        this.root = root;

        this.worldTime = new WorldTime(8, 100);

        this.timeAmbientColorFilter = new Ambient();
        this.dayAmbientColorFilter = new Ambient();

        this.root.filters = [this.timeAmbientColorFilter, this.dayAmbientColorFilter];
    }

    test(entity) {
        return false;
    }

    postUpdate() {
        
        this.worldTime.tick();

        console.log(this.worldTime.getTimeString());
        
        this.timeAmbientColorFilter.ambientColor = this.worldTime.getTimeAmbientColor();
        this.dayAmbientColorFilter.ambientColor = this.worldTime.getDayAmbientColor();
    }
}
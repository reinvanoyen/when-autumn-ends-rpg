"use strict";

import ECS from 'tnt-ecs';

export default class SpatialAwareness extends ECS.Component {

    getName() {
        return 'spatialAwareness';
    }

    getDefaults() {
        return {
            topLeft: '0-0',
            topRight: '0-0',
            bottomRight: '0-0',
            bottomLeft: '0-0',
            isDirty: false
        };
    }
}
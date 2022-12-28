"use strict";

import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

export default class SpatialHashingSystem extends ECS.System {
    
    constructor() {
        super();
        this.buckets = {};
    }

    generateSpatialHashes(entity) {
        return [
            Math.floor(entity.components.collisionBox.topLeft[0] / 200)+'-'+Math.floor(entity.components.collisionBox.topLeft[1] / 200), // topLeft
            Math.floor(entity.components.collisionBox.topRight[0] / 200)+'-'+Math.floor(entity.components.collisionBox.topRight[1] / 200), // topRight
            Math.floor(entity.components.collisionBox.bottomRight[0] / 200)+'-'+Math.floor(entity.components.collisionBox.bottomRight[1] / 200), // bottomRight
            Math.floor(entity.components.collisionBox.bottomLeft[0] / 200)+'-'+Math.floor(entity.components.collisionBox.bottomLeft[1] / 200) // bottomLeft
        ];
    }

    addEntityToBucket(hash, entity) {

        if (!this.buckets[hash]) {
            this.buckets[hash] = [];
        }

        this.buckets[hash].push(entity);
        entity.components.spatialAwareness.isDirty = false;
    }

    addEntityToBuckets(hashes, entity) {
        hashes.filter((value, index, array) => {
            // Only keep unique values
            return array.indexOf(value) === index;
        }).forEach((hash) => {
            // Add the entity to all buckets
            this.addEntityToBucket(hash, entity);
        });
    }
    
    removeDirtyEntitiesFromBucket(hash) {
        this.buckets[hash] = this.buckets[hash].filter((entity) => {
            return ! entity.components.spatialAwareness.isDirty;
        });
    }
    
    test(entity) {
        return entity.components.spatialAwareness && entity.components.collisionBox && entity.components.position;
    }
    
    exit(entity) {

        let { spatialAwareness } = entity.components;

        // @TODO optimize this
        spatialAwareness.isDirty = true;
        this.removeDirtyEntitiesFromBucket(spatialAwareness.topLeft);
        spatialAwareness.isDirty = true;
        this.removeDirtyEntitiesFromBucket(spatialAwareness.topRight);
        spatialAwareness.isDirty = true;
        this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomRight);
        spatialAwareness.isDirty = true;
        this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomLeft);
    }

    enter(entity) {

        let hashes = this.generateSpatialHashes(entity);

        hashes.filter((value, index, array) => {

            // Only keep unique values
            return array.indexOf(value) === index;
        }).forEach((hash) => {

            // Add the entity to all buckets
            this.addEntityToBucket(hash, entity);
        });
    }

    update(entity) {

        let {spatialAwareness} = entity.components;

        // Generate hashes
        let hashes = this.generateSpatialHashes(entity);

        if (
            hashes[0] !== spatialAwareness.topLeft ||
            hashes[1] !== spatialAwareness.topRight ||
            hashes[2] !== spatialAwareness.bottomRight ||
            hashes[3] !== spatialAwareness.bottomLeft
        ) {
            // Something changed...
            // @TODO optimize this whole thing, check which bucket changed and only swap that one out instead of all of them...
            spatialAwareness.isDirty = true;
            this.removeDirtyEntitiesFromBucket(spatialAwareness.topLeft);
            spatialAwareness.isDirty = true;
            this.removeDirtyEntitiesFromBucket(spatialAwareness.topRight);
            spatialAwareness.isDirty = true;
            this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomRight);
            spatialAwareness.isDirty = true;
            this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomLeft);

            entity.components.spatialAwareness.topLeft = hashes[0];
            entity.components.spatialAwareness.topRight = hashes[1];
            entity.components.spatialAwareness.bottomRight = hashes[2];
            entity.components.spatialAwareness.bottomLeft = hashes[3];
            
            this.addEntityToBuckets(hashes, entity);
        }
    }

    postUpdate() {
        //console.log(this.buckets);
    }
}
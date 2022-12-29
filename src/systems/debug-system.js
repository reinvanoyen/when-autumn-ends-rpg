import ECS from 'tnt-ecs';
import {Graphics} from "pixi.js";
import Text from "../components/text";

export default class DebugSystem extends ECS.System {

    constructor(renderingSystem) {
        super();
        this.renderingSystem = renderingSystem;
    }

    test(entity) {
        return (entity.components.debug);
    }

    enter(entity) {

        let { collisionBox, position} = entity.components;

        if (collisionBox && position) {
            entity.debugCollisionBox = new Graphics();
            entity.debugCollisionBox.parentGroup = this.renderingSystem.frontGroup;
            this.renderingSystem.root.addChild(entity.debugCollisionBox);
        }
    }

    exit(entity) {
        if (entity.debugCollisionBox) {
            this.renderingSystem.root.removeChild(entity.debugCollisionBox);
            delete entity.debugCollisionBox;
        }
    }

    update(entity) {

        if (entity.debugCollisionBox) {

            let { collisionBox, health } = entity.components;

            if (collisionBox) {
                entity.debugCollisionBox.alpha = 1;
                entity.debugCollisionBox.clear();
                entity.debugCollisionBox.lineStyle(1, (collisionBox.entityCollision ? 0xF14000 : 0X00F140), 1);
                entity.debugCollisionBox.drawPolygon([
                    collisionBox.topLeft[0], collisionBox.topLeft[1],
                    collisionBox.topRight[0], collisionBox.topRight[1],
                    collisionBox.bottomRight[0], collisionBox.bottomRight[1],
                    collisionBox.bottomLeft[0], collisionBox.bottomLeft[1]
                ]);
                entity.debugCollisionBox.endFill();
            }

            if (health) {
                entity.addComponent(new Text({
                    string: 'HP: '+health.amount,
                    size: 10,
                    offsetY: 0,
                    offsetX: -20
                }));
            }
        }
    }
}

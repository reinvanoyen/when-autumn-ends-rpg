import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

export default class CollisionPositionSystem extends ECS.System {
    
    test(entity) {
        return (entity.components.collisionBox && entity.components.position);
    }
    
    update(entity) {

        let { collisionBox, position } = entity.components;
        
        let x = position.x;
        let y = position.y;
        let [anchorX, anchorY] = collisionBox.anchor;
        let width = collisionBox.width;
        let height = collisionBox.height;

        collisionBox.topLeft = Vector2.fromValues(x - (width * anchorX), y - (height * anchorY));
        collisionBox.topRight = Vector2.fromValues(x - (width * anchorX) + width, y - (height * anchorY));
        collisionBox.bottomRight = Vector2.fromValues(x - (width * anchorX) + width, y - (height * anchorY) + height);
        collisionBox.bottomLeft = Vector2.fromValues(x - (width * anchorX), y - (height * anchorY) + height);
    }
}
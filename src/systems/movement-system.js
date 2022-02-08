import ECS from 'tnt-ecs';
const Vector2 = require('gl-matrix').vec2;

/*

* Movement
* 
* Adds velocity to position
* 
* */
export default class MovementSystem extends ECS.System {
    
    test(entity) {
        return entity.components.position && entity.components.velocity;
    }
    
    update(entity) {

        let position = Vector2.fromValues(entity.components.position.x, entity.components.position.y);
        
        Vector2.add(position, position, Vector2.fromValues(entity.components.velocity.x, entity.components.velocity.y));
        
        entity.components.position.x = position[0];
        entity.components.position.y = position[1];
    }
}
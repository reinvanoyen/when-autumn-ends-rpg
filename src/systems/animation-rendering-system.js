import ECS from 'tnt-ecs';
import * as PIXI from 'pixi.js';

export default class AnimationRenderingSystem extends ECS.System {

    constructor(root) {
        super();
        this.root = root;
    }

    test(entity) {
        return (entity.components.position && entity.components.animatedSprite);
    }

    enter(entity) {
        
        let { animatedSprite } = entity.components;
        
        let loader = new PIXI.Loader();
        
        loader.add(animatedSprite.src)
            .load(() => {

                entity.spritesheet = loader.resources[animatedSprite.src].spritesheet;
                entity.animatedSprite = new PIXI.AnimatedSprite(entity.spritesheet.animations[animatedSprite.animation]);
                entity.animatedSprite.animationSpeed = animatedSprite.speed;
                entity.animatedSprite.play();
                this.root.addChild(entity.animatedSprite);
            });
    }

    exit(entity) {
        this.root.removeChild(entity.animatedSprite);
        delete entity.animatedSprite;
    }

    update(entity) {
        
        let { position, animatedSprite } = entity.components;
        
        if (entity.animatedSprite) {

            entity.animatedSprite.animationSpeed = animatedSprite.speed;

            if (entity.prevAnimation && entity.prevAnimation !== animatedSprite.animation) {
                entity.animatedSprite.textures = entity.spritesheet.animations[animatedSprite.animation];
                entity.animatedSprite.play();
            }
            
            entity.animatedSprite.anchor.x = animatedSprite.anchorX;
            entity.animatedSprite.anchor.y = animatedSprite.anchorY;
            entity.animatedSprite.scale.x = animatedSprite.scaleX;
            entity.animatedSprite.scale.y = animatedSprite.scaleY;
            entity.animatedSprite.position.x = position.x;
            entity.animatedSprite.position.y = position.y;
        }

        entity.prevAnimation = animatedSprite.animation;
    }
}
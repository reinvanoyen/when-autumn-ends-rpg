import ECS from 'tnt-ecs';
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import Velocity from "../components/velocity";
import CollisionBox from "../components/collision-box";
import {vec2 as Vector2} from "gl-matrix";
import Disc from "../components/disc";
import CollisionExplosion from "../components/collision-explosion";
import DealsDamage from "../components/deals-damage";
import Lifetime from "../components/lifetime";
import math from "../util/math";
import Tag from "../components/tag";
import Sprite from "../components/sprite";

export default class ProjectileWeaponSystem extends ECS.System {

    test(entity) {
        return (
            entity.components.position && entity.components.velocity &&
            (entity.components.controller || entity.components.aiController)
            && entity.components.projectileWeapon
        );
    }

    enter(entity) {

        if (
            entity.components.tag &&
            entity.components.tag.string === 'player'
        ) {
            entity.crosshair = new ECS.Entity([
                new Position(),
                new Sprite({
                    src: 'assets/crosshair.png',
                    anchorX: .5,
                    anchorY: .5,
                })
            ]);

            this.core.addEntity(entity.crosshair);
        }
    }

    exit(entity) {
        this.core.removeEntity(entity.crosshair);
    }

    update(entity) {

        let { aiController, controller, position, projectileWeapon } = entity.components;

        controller = controller || aiController;

        // Update crosshair
        if (entity.crosshair) {
            entity.crosshair.components.position.x = controller.mouseX;
            entity.crosshair.components.position.y = controller.mouseY;
        }

        // Is weapon on cooldown?
        if (projectileWeapon.currentCooldown > 0) {

            // Weapon is still on cooldown
            projectileWeapon.currentCooldown = projectileWeapon.currentCooldown - 1;
            return;
        }

        // Are we firing?
        if (controller.mouseDown && controller.mouseX && controller.mouseY) {

            projectileWeapon.currentCooldown = projectileWeapon.cooldown;

            let velocityVec2 = Vector2.create();
            let positionVec2 = Vector2.fromValues(position.x, position.y);

            let crosshairVec2 = Vector2.fromValues(controller.mouseX, controller.mouseY);

            Vector2.subtract(velocityVec2, crosshairVec2, positionVec2);
            Vector2.normalize(velocityVec2, velocityVec2);

            let directionVec2 = Vector2.create();
            Vector2.scale(directionVec2, velocityVec2, 20.0);
            Vector2.add(positionVec2, positionVec2, directionVec2);

            Vector2.scale(velocityVec2, velocityVec2, projectileWeapon.velocity);

            // Spawn the bullets
            for (let i = 0; i < projectileWeapon.projectileAmount; i++) {

                let rotated = math.rotateVector(velocityVec2, math.randBetweenPosNeg(-(projectileWeapon.spread/2), projectileWeapon.spread/2));
                let newDirectionVec2 = Vector2.fromValues(rotated.x, rotated.y);

                this.core.addEntity(new ECS.Entity([
                    new Tag({string: 'bullet'}),
                    new Position({
                        x: positionVec2[0],
                        y: positionVec2[1]
                    }),
                    new Velocity({
                        x: newDirectionVec2[0],
                        y: newDirectionVec2[1]
                    }),
                    new Lifetime({amount: projectileWeapon.lifetime}),
                    new Disc({
                        color: projectileWeapon.color,
                        radius: (projectileWeapon.size / 2)
                    }),
                    new DealsDamage({
                        amount: projectileWeapon.damage
                    }),
                    new CollisionExplosion({
                        radius: projectileWeapon.aoe,
                        damage: projectileWeapon.aoeDamage
                    }),
                    new SpatialAwareness(),
                    new CollisionBox({
                        anchor: Vector2.fromValues(.5, .5),
                        width: projectileWeapon.size,
                        height: projectileWeapon.size
                    })
                ]));
            }
        }
    }
}

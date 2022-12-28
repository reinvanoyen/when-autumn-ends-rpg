import ECS from 'tnt-ecs';
import SpatialAwareness from "../components/spatial-awareness";
import Position from "../components/position";
import Velocity from "../components/velocity";
import CollisionBox from "../components/collision-box";
import {vec2 as Vector2} from "gl-matrix";
import Disc from "../components/disc";
import CollisionExplosion from "../components/collision-explosion";

export default class ProjectileWeaponSystem extends ECS.System {

    test(entity) {
        return (entity.components.position && entity.components.velocity && entity.components.controller && entity.components.projectileWeapon);
    }

    enter(entity) {
        //
    }

    exit(entity) {
        //
    }

    update(entity) {

        let { velocity, position, projectileWeapon } = entity.components;

        if (projectileWeapon.currentCooldown > 0) {

            projectileWeapon.currentCooldown = projectileWeapon.currentCooldown - 1;

        } else {

            if (entity.components.controller.keySpace) {

                projectileWeapon.currentCooldown = projectileWeapon.cooldown;

                let velocity = Vector2.fromValues(entity.components.velocity.x, entity.components.velocity.y);
                Vector2.normalize(velocity, velocity);
                Vector2.add(velocity, velocity, velocity);

                let bullet = new ECS.Entity([
                    new Position({
                        x: position.x + projectileWeapon.offsetX,
                        y: position.y + projectileWeapon.offsetY
                    }),
                    new Velocity({
                        x: velocity[0],
                        y: velocity[1]
                    }),
                    new Disc({
                        color: 0xf14000,
                        radius: 3
                    }),
                    new SpatialAwareness(),
                    new CollisionExplosion({
                        radius: 35
                    }),
                    new CollisionBox({
                        anchor: Vector2.fromValues(.5, .5),
                        width: 6,
                        height: 6
                    })
                ]);

                this.core.addEntity(bullet);
            }
        }
    }
}

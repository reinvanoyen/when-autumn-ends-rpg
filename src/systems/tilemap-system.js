import ECS from 'tnt-ecs';
import Position from "../components/position";
import Sprite from "../components/sprite";
import Health from "../components/health";
import weaponPickup from "../assemblage/weapon-pickup";
import SpatialAwareness from "../components/spatial-awareness";
import CollisionBox from "../components/collision-box";
import ground from "../assemblage/ground";
import enemy from "../assemblage/enemy";
import Messages from "../core/messages";
import healthPickup from "../assemblage/health-pickup";
const Vector2 = require('gl-matrix').vec2;

export default class TilemapSystem extends ECS.System {

    constructor() {
        super();
        this.tileSize = 64;
        this.playerId = null;

        Messages.addListener('player', data => {
            this.playerId = data.entity.getId();
        });
    }

    test(entity) {
        return (entity.components.tilemap && entity.components.position);
    }

    enter(entity) {

        // add the other entities
        let tiles = entity.components.tilemap.tiles;
        entity.tileEntities = [];

        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {

                let tileX = (x * this.tileSize) + entity.components.position.x;
                let tileY = (y * this.tileSize) + entity.components.position.y;

                if ((tiles[y][x] !== 1)) {

                    if (tiles[y][x] === 'x' && this.playerId) {
                        let enemyEntity = enemy(tileX, tileY, this.playerId);
                        this.core.addEntity(enemyEntity);
                    } else if (tiles[y][x] === 'p') {
                        let weaponEntity = weaponPickup(tileX, tileY);
                        this.core.addEntity(weaponEntity);
                    } else if (tiles[y][x] === 'h') {
                        let healthEntity = healthPickup(tileX, tileY);
                        this.core.addEntity(healthEntity);
                    } else {
                        let groundTile = ground(tiles[y][x], tileX, tileY);
                        entity.tileEntities.push(groundTile);
                        this.core.addEntity(groundTile);
                    }
                }
            }
        }
    }

    exit(entity) {
        for (let i = 0; i < entity.tileEntities.length; i++) {
            this.core.removeEntity(entity.tileEntities[i]);
        }
     }

    update(entity) {
        // Nothing (yet?)
    }
}

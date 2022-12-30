import ECS from 'tnt-ecs';
import CollisionBox from "../components/collision-box";
import Position from "../components/position";
import SpatialAwareness from "../components/spatial-awareness";
import Sprite from "../components/sprite";
import Health from "../components/health";
import Disc from "../components/disc";
import Pickup from "../components/pickup";
import ProjectileWeapon from "../components/projectile-weapon";
import * as util from "util";
import math from "../util/math";
import weaponPickup from "../assemblage/weapon-pickup";
import enemy from "../assemblage/enemy";
const Vector2 = require('gl-matrix').vec2;

export default class TilemapSystem extends ECS.System {

    constructor() {
        super();
        this.tileSize = 64;
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

                switch (tiles[y][x]) {
                    case 1:
                        // The tile
                        let tile = new ECS.Entity([
                            new Health({
                                amount: 1000
                            }),
                            new Sprite({
                                src: './assets/block.png',
                                anchorX: 0,
                                anchorY: 0
                            }),
                            new Position({
                                x: tileX,
                                y: tileY
                            }),
                            new SpatialAwareness(),
                            new CollisionBox({
                                active: false,
                                anchor: Vector2.fromValues(0, 0),
                                width: this.tileSize,
                                height: this.tileSize
                            })
                        ]);
                        entity.tileEntities.push(tile);
                        this.core.addEntity(tile);
                        break;
                    case 2:
                        // The tile
                        let grassTile = new ECS.Entity([
                            new Health(),
                            new Sprite({
                                src: './assets/grass.png',
                                anchorX: 0,
                                anchorY: 0
                            }),
                            new Position({
                                x: tileX,
                                y: tileY
                            }),
                            new SpatialAwareness(),
                            new CollisionBox({
                                anchor: Vector2.fromValues(0, 0),
                                width: this.tileSize,
                                height: this.tileSize
                            })
                        ]);
                        entity.tileEntities.push(grassTile);
                        this.core.addEntity(grassTile);
                        break;
                    case 3:
                        this.core.addEntity(weaponPickup(tileX, tileY));
                        break;
                    default:
                        break;
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

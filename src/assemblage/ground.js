import ECS from "tnt-ecs";
import Sprite from "../components/sprite";
import Position from "../components/position";
import SpatialAwareness from "../components/spatial-awareness";
import CollisionBox from "../components/collision-box";
import Health from "../components/health";
import {vec2 as Vector2} from "gl-matrix";

export default function ground(tileType, x, y) {

    let tileTypes = {
        0: 'water',
        1: 'grass',
        2: 'block',
        3: 'dirt',
        4: 'mud',
        5: 'rock',
        6: 'dry-dirt'
    };

    return new ECS.Entity([
        new Sprite({
            src: './assets/'+tileTypes[tileType]+'.png',
            anchorX: 0,
            anchorY: 0,
            group: 'backGroup'
        }),
        new SpatialAwareness(),
        new CollisionBox({
            anchor: Vector2.fromValues(0, 0),
            width: 64,
            height: 64
        }),
        new Health({amount: 1000}),
        new Position({x, y})
    ]);
}

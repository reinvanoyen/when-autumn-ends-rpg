import ECS from "tnt-ecs";
import Sprite from "../components/sprite";
import Position from "../components/position";

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
        new Position({x, y})
    ]);
}

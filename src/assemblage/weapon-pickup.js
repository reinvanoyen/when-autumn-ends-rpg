"use strict";

import math from "../util/math";
import assaultRifle from "./assault-rifle";
import shotgun from "./shotgun";
import rpg from "./rpg";
import smg from "./smg";

export default function weaponPickup(x, y) {

    let item = math.randFromArray(['smg', 'shotgun', 'rpg', 'assaultRifle']);

    if (item === 'smg') {
        return smg(x, y);
    } else if (item === 'shotgun') {
        return shotgun(x, y);
    } else if (item === 'rpg') {
        return rpg(x, y);
    } else if (item === 'assaultRifle') {
        return assaultRifle(x, y);
    }
};

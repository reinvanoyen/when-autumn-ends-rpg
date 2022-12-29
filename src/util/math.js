"use strict";

const math = {
    randBetween: (min, max) => {
        return Math.floor(Math.random() * max) + min;
    },
    randFloatBetween: (min, max) => {
        return (Math.random() * (max - min) + min);
    },
    randBetweenPosNeg: (min, max) => {
        return math.randBetween(min, max) * (Math.round(Math.random()) ? 1 : -1)
    },
    randDegreeBetween: (min, max) => {
        return (Math.random() * (max - min) + min) / 180 * Math.PI;
    },
    randHexColor: () => {
        return (Math.floor(Math.random()*0xffffff));
    },
    pointInDirection: (angle, distance) => {
        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance
        };
    },
    randFromArray: (array) => {
        return array[Math.floor(Math.random()*array.length)];
    },
    minFromArray: (array) => {
        return Math.min.apply(Math, array);
    },
    maxFromArray: (array) => {
        return Math.max.apply(Math, array);
    },
    rotateVector: (vec, ang) => {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);

        return {
            x: Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000,
            y: Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000
        };
    }
    /*
    randomCircularPointBetween: (min, max) => {

        var rand = Math.random;
        var sin = Math.sin;
        var cos = Math.cos;
        var PI = Math.PI;
        var TWO_PI = PI * 2;

        //generate a random distance between min and max
        var dist = rand() * (max - min) + min;

        //generate a random angle between 0 and PI * 2
        var rads = rand() * TWO_PI;

        // calculate the point on a cirlce with:
        // radius: dist
        // angle: rads
        var x = sin(rads) * dist;
        var y = cos(rads) * dist;

        // return a simple point object
        return {x: x, y: y};
    },*/
};

export default math;

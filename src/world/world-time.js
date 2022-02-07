"use strict";

const Vector4 = require('gl-matrix').vec4;

let DARK_COLOR = Vector4.fromValues( .05, .15, .2, 1 );
let DAWN_COLOR = Vector4.fromValues( .6, .5, .6, 1 );
let LIGHT_COLOR = Vector4.fromValues( 1, 1, .95, 1 );
let DUSK_COLOR = Vector4.fromValues( 0.7, .5, .5, 1 );

let NIGHT_TIME = 23;
let DAWN_TIME = 7;
let DAY_TIME = 10;
let DUSK_TIME = 20;

let DARK_TO_DAWN_TIME = 1.0;
let DAWN_TO_LIGHT_TIME = 2.15;
let LIGHT_TO_DUSK_TIME = 1.5;
let DUSK_TO_DARK_TIME = 2.0;

let WINTER = 335; let WINTER_TO_SPRING_DAYS = 30;
let SPRING = 60; let SPRING_TO_SUMMER_DAYS = 30;
let SUMMER = 150; let SUMMER_TO_FALL_DAYS = 30;
let FALL = 240; let FALL_TO_WINTER_DAYS = 30;

let WINTER_COLOR = Vector4.fromValues( .6, .6, 1, 1 );
let SPRING_COLOR = Vector4.fromValues( 1, 1, .8, 1 );
let SUMMER_COLOR = Vector4.fromValues( 1, 1, .8, 1 );
let FALL_COLOR = Vector4.fromValues( .9, .7, .6, 1 );

export default class WorldTime {

    constructor(time, day) {

        this.timestamp = 0;
        this.time = time;
        this.day = day;

        this.timeColor = Vector4.create();
        this.dayColor = Vector4.create();
    }

    tick() {

        this.timestamp += 0.01;
        this.time += 0.01;

        if( this.time > 24 ) {
            this.time = 0;
            this.day += 1;
            if( this.day > 365 ) {
                this.day = 0;
            }
        }

        this.calculateTimeColor();
        this.calculateDayColor();
    }

    calculateTimeColor() {

        // Calculate time ambient color
        let outputColor = Vector4.create();
        let lerpColor = null;
        let factor = 0;

        if( this.time >= NIGHT_TIME ) {

            outputColor = Vector4.clone( DARK_COLOR );

        } else if( this.time <= DAWN_TIME ) {

            outputColor = Vector4.clone( DARK_COLOR );

            if( this.time >= ( DAWN_TIME - DARK_TO_DAWN_TIME ) ) {

                lerpColor = Vector4.clone( DAWN_COLOR );
                factor = ( this.time - ( DAWN_TIME - DARK_TO_DAWN_TIME ) / DARK_TO_DAWN_TIME );
            }

        } else if( ( this.time >= DAWN_TIME ) && ( this.time < DAY_TIME ) ) {

            outputColor = Vector4.clone( DAWN_COLOR );

            // if in transition to day
            if ( this.time >= ( DAY_TIME - DAWN_TO_LIGHT_TIME ) ) {

                lerpColor = Vector4.clone( LIGHT_COLOR );
                factor = ( this.time - ( DAY_TIME - DAWN_TO_LIGHT_TIME ) ) / DAWN_TO_LIGHT_TIME;
            }

        } else if( ( this.time >= DAY_TIME ) && ( this.time < DUSK_TIME ) ) {

            outputColor = Vector4.clone( LIGHT_COLOR );

            // if in transition to dusk
            if( this.time >= ( DUSK_TIME - LIGHT_TO_DUSK_TIME ) ) {

                lerpColor = Vector4.clone( DUSK_COLOR );
                factor = ( this.time - ( DUSK_TIME - LIGHT_TO_DUSK_TIME ) ) / LIGHT_TO_DUSK_TIME;
            }

        } else if( ( this.time >= DUSK_TIME ) && ( this.time < NIGHT_TIME ) ) {

            outputColor = Vector4.clone( DUSK_COLOR );

            if( this.time >= ( NIGHT_TIME - DUSK_TO_DARK_TIME ) ) {

                lerpColor = Vector4.clone( DARK_COLOR );
                factor = ( this.time - ( NIGHT_TIME - DUSK_TO_DARK_TIME ) ) / DUSK_TO_DARK_TIME;
            }
        }

        // Apply the calculated colors
        this.timeColor = Vector4.clone( outputColor );

        if( lerpColor != null ) {
            Vector4.lerp( this.timeColor, this.timeColor, lerpColor, factor );
        }
    }

    calculateDayColor() {

        // Calculate day ambient color
        let outputColor = Vector4.create();
        let lerpColor = null;
        let factor = 0;

        if( this.day >= WINTER ) {

            outputColor = Vector4.clone( WINTER_COLOR );

        } else if( this.day <= SPRING ) {

            outputColor = Vector4.clone( WINTER_COLOR );

            if( this.day >= ( SPRING - WINTER_TO_SPRING_DAYS ) ) {

                lerpColor = Vector4.clone( SPRING_COLOR );
                factor = ( this.day - ( SPRING - WINTER_TO_SPRING_DAYS ) ) / WINTER_TO_SPRING_DAYS;
            }

        } else if( ( this.day >= SPRING ) && ( this.day < SUMMER ) ) {

            outputColor = Vector4.clone( SPRING_COLOR );

            // if in transition to day
            if ( this.day >= ( SUMMER - SPRING_TO_SUMMER_DAYS ) ) {

                lerpColor = Vector4.clone( SUMMER_COLOR );
                factor = ( this.day - ( SUMMER - SPRING_TO_SUMMER_DAYS ) ) / SPRING_TO_SUMMER_DAYS;
            }

        } else if( ( this.day >= SUMMER ) && ( this.day < FALL ) ) {

            outputColor = Vector4.clone( SUMMER_COLOR );

            // if in transition to dusk
            if( this.day >= ( FALL - SUMMER_TO_FALL_DAYS ) ) {

                lerpColor = Vector4.clone( FALL_COLOR );
                factor = ( this.day - ( FALL - SUMMER_TO_FALL_DAYS ) ) / SUMMER_TO_FALL_DAYS;
            }

        } else if( ( this.day >= FALL ) && ( this.day < WINTER ) ) {

            outputColor = Vector4.clone( FALL_COLOR );

            if( this.day >= ( WINTER - FALL_TO_WINTER_DAYS ) ) {

                lerpColor = Vector4.clone( WINTER_COLOR );
                factor = ( this.day - ( WINTER - FALL_TO_WINTER_DAYS ) ) / FALL_TO_WINTER_DAYS;
            }
        }

        // Apply the calculated colors
        this.dayColor = Vector4.clone( outputColor );

        if( lerpColor != null ) {
            Vector4.lerp( this.dayColor, this.dayColor, lerpColor, factor );
        }
    }

    getTimestamp() {
        return this.timestamp;
    }

    getTime() {
        return this.time;
    }

    getDay() {
        return this.day;
    }

    getTimeAmbientColor() {
        return [ this.timeColor[0], this.timeColor[1], this.timeColor[2], this.timeColor[3] ];
    }

    getDayAmbientColor() {
        return [ this.dayColor[0], this.dayColor[1], this.dayColor[2], this.dayColor[3] ];
    }

    getTimeString() {
        return 'hour: ' + this.getTime().toFixed(2) + ' - day: ' + this.getDay();
    }
}
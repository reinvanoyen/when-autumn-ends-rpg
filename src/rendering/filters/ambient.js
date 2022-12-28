"use strict";

import * as PIXI from 'pixi.js';

export default class Ambient extends PIXI.Filter {
    
    constructor() {
        super(
            // vertex shader
            '',
            // fragment shader
            `
            varying vec2 vTextureCoord;

            uniform sampler2D uSampler;
            uniform vec4 ambientColor;
            
            void main() {
                vec4 texColor = texture2D(uSampler, vTextureCoord);
                float average = (texColor.r + texColor.g + texColor.b) / 3.0;
                gl_FragColor = texColor * ambientColor;
            }
            `
        );

        this.ambientColor = [ 1, 1, 0.9, 1 ];
    }

    get ambientColor() {
        return this.uniforms.ambientColor;
    }

    set ambientColor(ambientColorValue) {
        this.uniforms.ambientColor = ambientColorValue;
    }
}
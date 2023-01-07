import ECS from 'tnt-ecs';

export default class WorldMapSystem extends ECS.System {

    constructor() {
        super();

        this.isReady = false;
        this.worldScale = 200;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'assets/world.png';

        this.mapWrapperEl = document.createElement('div');
        this.mapWrapperEl.style.position = 'fixed';
        this.mapWrapperEl.style.transform = 'scale(.1)';
        this.mapWrapperEl.style.transformOrigin = '0 0';
        this.mapWrapperEl.style.top = '30px';
        this.mapWrapperEl.style.left = '30px';

        this.mapMarkerEl = document.createElement('div');
        this.mapMarkerEl.style.width = '50px';
        this.mapMarkerEl.style.height = '50px';
        this.mapMarkerEl.style.borderRadius = '50px';
        this.mapMarkerEl.style.backgroundColor = '#f14000';
        this.mapMarkerEl.style.position = 'absolute';

        this.canvasEl = document.createElement('canvas');
        this.canvasEl.width = 2300;
        this.canvasEl.height = 1600;

        this.mapWrapperEl.appendChild(this.canvasEl);
        this.mapWrapperEl.appendChild(this.mapMarkerEl);

        document.body.appendChild(this.mapWrapperEl);

        this.ctx = this.canvasEl.getContext('2d');

        img.addEventListener('load', () => {
            this.ctx.drawImage(img, 0, 0);
            this.isReady = true;
        });
    }

    test(entity) {
        return (entity.components.camera && entity.components.position);
    }

    enter(entity) {
        entity.worldPosition = {
            x: 0,
            y: 0,
            type: null
        };
    }

    exit(entity) {
        delete entity.worldPosition;
    }

    determineType(r, g, b) {
        if (g === 255) {
            return 'land';
        }
        return 'water';
    }

    update(entity) {

        entity.worldPosition.x = Math.floor(entity.components.position.x / this.worldScale);
        entity.worldPosition.y = Math.floor(entity.components.position.y / this.worldScale);

        // Update the marker
        this.mapMarkerEl.style.left = entity.worldPosition.x+'px';
        this.mapMarkerEl.style.top = entity.worldPosition.y+'px';

        if (this.isReady) {

            let pixelData = this.ctx.getImageData(entity.worldPosition.x, entity.worldPosition.y, 1, 1);
            let rgba = pixelData.data;

            // Current chunk
            // Top left
            // Above
            // Top right
            // Right
            // Bottom right
            // Below
            // Bottom left
            // Left

            entity.worldPosition.type = this.determineType(rgba[0], rgba[1], rgba[2]);
        }
    }
}

import ECS from 'tnt-ecs';
import Tilemap from "../components/tilemap";
import Position from "../components/position";

export default class WorldChunkSystem extends ECS.System {

    constructor() {
        super();
        this.chunks = {};
        this.tileSize = 64;
        this.chunkSize = 15;
    }
    
    test(entity) {
        return (entity.components.camera && entity.components.position);
    }

    enter(entity) {
        entity.chunk = [null, null];
    }

    exit(entity) {
        // @TODO...does this work?
        for (let i = 0; i < this.chunks.length; i++) {
            for (let j = 0; j < this.chunks.length; j++) {
                this.destroyChunk(i, j);
            }
        }
        delete entity.chunk;
    }

    update(entity) {

        let { position } = entity.components;
        
        let chunk = [
            Math.floor(position.x / (this.tileSize * this.chunkSize)),
            Math.floor(position.y / (this.tileSize * this.chunkSize))
        ];
        
        if (entity.chunk[0] !== chunk[0] || entity.chunk[1] !== chunk[1]) {
            
            if (entity.chunk[0] !== null && entity.chunk[1] !== null) {
                
                // Remove top row
                this.destroyChunk(chunk[0]-2, chunk[1]-2);
                this.destroyChunk(chunk[0]-1, chunk[1]-2);
                this.destroyChunk(chunk[0], chunk[1]-2);
                this.destroyChunk(chunk[0]+1, chunk[1]-2);
                this.destroyChunk(chunk[0]+2, chunk[1]-2);

                // Left side
                this.destroyChunk(chunk[0]-2, chunk[1]-1);
                this.destroyChunk(chunk[0]-2, chunk[1]);
                this.destroyChunk(chunk[0]-2, chunk[1]+1);
                
                // Bottom side
                this.destroyChunk(chunk[0]-1, chunk[1]+2);
                this.destroyChunk(chunk[0], chunk[1]+2);
                this.destroyChunk(chunk[0]+1, chunk[1]+2);
                this.destroyChunk(chunk[0]+2, chunk[1]+2);
                
                // Right side
                this.destroyChunk(chunk[0]+2, chunk[1]-1);
                this.destroyChunk(chunk[0]+2, chunk[1]);
                this.destroyChunk(chunk[0]+2, chunk[1]+1);
            }
            
            this.createChunk(chunk[0], chunk[1]); // Current chunk
            this.createChunk(chunk[0]-1, chunk[1]-1); // Top left
            this.createChunk(chunk[0], chunk[1]-1); // Above
            this.createChunk(chunk[0]+1, chunk[1]-1); // Top right
            this.createChunk(chunk[0]+1, chunk[1]); // Right
            this.createChunk(chunk[0]+1, chunk[1]+1); // Bottom right
            this.createChunk(chunk[0], chunk[1]+1); // Below
            this.createChunk(chunk[0]-1, chunk[1]+1); // Bottom left
            this.createChunk(chunk[0]-1, chunk[1]); // Left

            // Update the chunk
            entity.chunk = chunk;
        }
    }
    
    destroyChunk(x, y) {
        if (this.chunks[x] && this.chunks[x][y]) {
            let chunk = this.core.findEntityById(this.chunks[x][y]);
            this.core.removeEntity(chunk);
            this.chunks[x][y] = null;
        }
    }

    createChunk(x, y) {
        
        // x-space for the chunk doesn't exist
        if (! this.chunks[x]) {
            this.chunks[x] = [];
        }
        
        // Current chunk doesn't exist...
        if (! this.chunks[x][y]) {
            // Create a chunk entity
            let chunk = new ECS.Entity([
                new Tilemap(),
                new Position({
                    x: x * (this.tileSize * this.chunkSize),
                    y: y * (this.tileSize * this.chunkSize)
                })
            ]);
            // Store the chunk's id
            this.chunks[x][y] = chunk.getId();
            
            // Add it to the ECS
            this.core.addEntity(chunk);
        }
    }
}
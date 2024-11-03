export class JotaroName {
    constructor(fighters) {
        
        this.image = document.querySelector('img[alt="jotaroName');

        this.fighters = fighters;

        this.frames = new Map([
            ['tag-1', [0, 0, 140, 50]],
        ]);
    }

    drawFrame(ctx, frameKey, x, y, direction = 1){
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
    
        const scaledWidth = sourceWidth / 3;
        const scaledHeight = sourceHeight / 3;
    
        ctx.scale(direction, 1);
        ctx.drawImage(this.image, 
            sourceX, sourceY, sourceWidth, sourceHeight,
            x * direction, y, scaledWidth, scaledHeight
        );
    
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    update(time){

    }

    drawNameTags(ctx){
        this.drawFrame(ctx, 'tag-1', 350, 33);
    }

    draw(ctx){

        this.drawNameTags(ctx);
    }

}
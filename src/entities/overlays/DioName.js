export class DioName {
    constructor(fighters) {
        
        this.image = document.querySelector('img[alt="dioName');

        this.fighters = fighters;

        this.frames = new Map([
            ['tag-0', [0, 0, 140, 84]],
        ]);
    }

    drawFrame(ctx, frameKey, x, y, direction = 1){
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
    
        const scaledWidth = sourceWidth / 5;
        const scaledHeight = sourceHeight / 5;
    
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
        this.drawFrame(ctx, 'tag-0', 73, 33);
    }

    draw(ctx){

        this.drawNameTags(ctx);
    }

}
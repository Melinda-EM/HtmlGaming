export function getCtx() {

    const canvasEl = document.querySelector('canvas');
    const ctx = canvasEl.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;

}

export function drawFrame(ctx, image, dimensions, x, y, direction = 1){
    const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;

    ctx.scale(direction, 1);
    ctx.drawImage(
        image, 
        sourceX, sourceY, sourceWidth, sourceHeight,
        x * direction, y, sourceWidth, sourceHeight
    );

    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

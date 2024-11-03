import { drawFrame } from '../../utils/context.js';
import { FRAME_TIME } from '../../constants/game.js';
import { BackgroundAnimation } from './shared/BackgroundAnimation.js';
import { SkewedFloor } from './shared/SkewedFloor.js';
import { STAGE_MID_POINT, STAGE_PADDING } from '../../constants/stage.js';
import { playSound } from '../../engine/GestionSound.js';

export class Stage0 {

        image = document.querySelector('img[alt="stage"]');

        muique = document.querySelector('audio#theme-metro');
        
        floor = new SkewedFloor(this.image, [341, 859, 1200, 65])

        frames = new Map([
            ['stage-background', [28, 28, 1824, 300]],
            ['stage-wall', [533, 420, 818, 98]],
            ['stage-foot-bottom', [341, 659, 1200, 25]],
            ['stage-rail', [741, 1172, 400, 30]],
            ['stage-rail-and-lamp', [370, 1339, 1110,165]],
            ['stage-rail-and-lamp-2', [370, 1649, 1110,165]],
            ['satge-quai', [30, 1890, 1820,209]],

            // ['grey-suit-1', [600, 24, 16, 24]],
            // ['grey-suit-2', [600, 88, 16, 24]],

            // ['bollard-small', [800, 184, 21, 16]],
            // ['bollard-large', [800, 176, 31, 24]],

            ['train', [30, 2402, 171, 95]],
        ]);

        // this.flag = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['flag-1', [848, 312, 40, 32]],
        //         ['flag-2', [848, 264, 40, 32]],
        //         ['flag-3', [848, 216, 40, 32]],
        //     ],
        //     [['flag-1', 133], ['flag-2', 133], ['flag-3', 133]]
        // );

        // this.baldMan = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['bald-man-1', [552, 8, 40, 64]],
        //         ['bald-man-2', [552, 72, 40, 64]],
        //         ['bald-man-3', [552, 136, 40, 64]],
        //     ],
        //     [['bald-man-1', 100], ['bald-man-2', 133], ['bald-man-3', 664], ['bald-man-2', 133]]
        // );

        // this.cheeringWoman = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['woman-1', [624, 16, 32, 56]],
        //         ['woman-2', [624, 80, 32, 56]],
        //         ['woman-3', [624, 144, 32, 56]],
        //     ],
        //     [['woman-1', 216], ['woman-2', 216], ['woman-3', 216], ['woman-2', 216]]
        // );

        // this.greenJumperGuy = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['green-jumper-1', [664, 16, 32, 56]],
        //         ['green-jumper-2', [664, 80, 32, 56]],
        //     ],
        //     [
        //         ['green-jumper-1', 664], ['green-jumper-2', 498], ['green-jumper-1', 133],
        //         ['green-jumper-2', 133]
        //     ],
        // );

        // this.blueCoatGuy = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['blue-coat-1', [704, 16, 48, 56]],
        //         ['blue-coat-2', [704, 80, 48, 56]],
        //         ['blue-coat-3', [704, 144, 48, 56]],
        //     ],
        //     [
        //         ['blue-coat-1', 996], ['blue-coat-2', 133], ['blue-coat-3', 100], 
        //         ['blue-coat-2', 133],['blue-coat-1', 249], ['blue-coat-2', 133],
        //         ['blue-coat-3', 100], ['blue-coat-2', 133],
        //     ],
        // );

        // this.purpleJumperGuy = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['purple-jumper-1', [808, 24, 48, 32]],
        //         ['purple-jumper-2', [808, 72, 48, 32]],
        //         ['purple-jumper-3', [808, 120, 48, 32]],
        //     ],
        //     [
        //         ['purple-jumper-1', 1992], ['purple-jumper-2', 166], ['purple-jumper-3', 166],
        //         ['purple-jumper-2', 166], ['purple-jumper-1', 664], ['purple-jumper-2', 166],
        //         ['purple-jumper-3', 166], ['purple-jumper-2', 166], ['purple-jumper-3', 166],
        //         ['purple-jumper-2', 166]
        //     ],
        // );

        // this.browSuitGuy = new BackgroundAnimation(
        //     this.image,
        //     [
        //         ['brown-suit-1', [760, 16, 40, 40]],
        //         ['brown-suit-2', [760, 64, 40, 40]],
        //         ['brown-man-3', [760, 112, 40, 40]],
        //     ],
        //     [['brown-suit-1', 133], ['brown-suit-2', 133], ['brown-suit-3', 133], ['brown-suit-2', 133]]
        // );

        // this.greySuitMan = {
        //     animationFrame: 0,
        //     animationTimer: 0,
        //     animationDelay: 0,
        // };

        // this.boat = {
        //     position: { x: 0, y: 0 },
        //     animationFrame: 0,
        //     animationTimer: 0,
        //     animationDelay: 22,
        //     animation: [0, -1, -2, -3, -4, -3, -2, -1],
        // };

    constructor() {
        playSound(this.muique, 0.5);
    }

    
    // updateBoat(time) {
    //     if (time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
    //         this.boat.animationTimer = time.previous;
    //         this.boat.animationFrame += 1;
    //         this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
    //     }

    //     if (this.boat.animationFrame >= this.boat.animation.length) {
    //         this.boat.animationFrame = 0;
    //     }
    // }

    // updateGreySuitMan(time){
    //     if (time.previous > this.greySuitMan.animationTimer + this.greySuitMan.animationDelay) {
    //         this.greySuitMan.animationTimer = time.previous;
    //         this.greySuitMan.animationDelay = 100 + (Math.random() * 900);
    //         this.greySuitMan.animationFrame = !this.greySuitMan.animationFrame;
    //     }
    // }

    update(time){
        // this.flag.update(time);
        // this.updateBoat(time);
        // this.baldMan.update(time);
        // this.updateGreySuitMan(time);
        // this.cheeringWoman.update(time);
        // this.greenJumperGuy.update(time);
        // this.blueCoatGuy.update(time);
        // this.purpleJumperGuy.update(time);
        // this.browSuitGuy.update(time);
    }
    
    // drawBoat(ctx, camera) {
    //     this.boat.position = {
    //         x: Math.floor(-104 - (camera.position.x / 1.157303)),
    //         y: Math.floor(- camera.position.y + this.boat.animation[this.boat.animationFrame]),
    //     }
    //     this.drawFrame(ctx, 'stage-rail-and-lamp', this.boat.position.x, this.boat.position.y);
    //     this.baldMan.draw(ctx, this.boat.position.x + 128, this.boat.position.y + 96);
    //     this.drawFrame(ctx, `grey-suit-${this.greySuitMan.animationFrame + 1}`,
    //     this.boat.position.x + 167, this.boat.position.y + 112);
    //     this.cheeringWoman.draw(ctx, this.boat.position.x + 192, this.boat.position.y + 104);
    //     this.greenJumperGuy.draw(ctx, this.boat.position.x + 224, this.boat.position.y + 104);
    //     this.blueCoatGuy.draw(ctx, this.boat.position.x + 288, this.boat.position.y + 96);
    //     this.purpleJumperGuy.draw(ctx, this.boat.position.x + 128, this.boat.position.y + 24);
    //     this.browSuitGuy.draw(ctx, this.boat.position.x + 88, this.boat.position.y + 34);
    // }

    drawFrame(ctx, frameKey, x, y){
        drawFrame(ctx, this.image, this.frames.get(frameKey), x, y);
    }

    drawSky(ctx, camera){
        const backgroundX = Math.floor(0 - (camera.position.x / 2.157303));

        this.drawFrame(ctx, 'stage-background', backgroundX, -camera.position.y);

        // this.flag.draw(ctx, backgroundX + 560, 16 - camera.position.y);
    }


    drawFloor(ctx, camera){
        this.floor.draw(ctx, camera, 195);

        this.drawFrame(
            ctx, 'stage-foot-bottom',
            STAGE_PADDING - camera.position.x * 1.1, 202 - camera.position.y,
        );
    }

    // drawSmallBollards(ctx, camera) {
    //     const cameraXOffest = camera.position.x / 1.54;
    //     const y = 166 - camera.position.y;

    //     this.drawFrame(ctx, 'bollard-small', Math.floor(468 - 92 - cameraXOffest), y);
    //     this.drawFrame(ctx, 'bollard-small', Math.floor(468 + 92 - cameraXOffest), y);
    // }

    drawLargeBollards(ctx, camera){
        // this.drawFrame(ctx, 'stage-foot-bottom', STAGE_PADDING - camera.position.x * 1.1, 202 - camera.position.y);

        const midPoint = STAGE_MID_POINT + STAGE_PADDING;
        const cameraXOffest = camera.position.x / 0.958;
        const y = 200 - camera.position.y;

        // this.drawFrame(ctx, 'bollard-large', Math.floor(midPoint - 147 - cameraXOffest), y);
        // this.drawFrame(ctx, 'bollard-large', Math.floor(midPoint + 147 - cameraXOffest), y);
    }

    drawBackground(ctx, camera){ 
        // this.drawFrame(ctx, 'stage-background', Math.floor(0 - (camera.position.x / 2.157303)), -camera.position.y);
        this.drawSky(ctx, camera);
        this.drawFrame(ctx, 'stage-wall', Math.floor(0- (camera.position.x / 1.157303)), 66 - camera.position.y);
        // this.drawFrame(ctx, 'stage-foot', Math.floor(0 - (camera.position.x / 1.157303)), 195 - camera.position.y);
        // this.floor.draw(ctx, camera, 195);
        this.drawFloor(ctx, camera);
        this.drawFrame(ctx, 'stage-rail', Math.floor(0 - (camera.position.x / 1.157303)), 205 - camera.position.y);
        // this.drawBoat(ctx, camera);
        this.drawFrame(ctx, 'stage-rail-and-lamp', Math.floor(-104 - (camera.position.x / 1.157303)), 55 - camera.position.y);
        this.drawFrame(ctx, 'stage-rail-and-lamp-2', Math.floor(-104 - (camera.position.x / 1.157303)), 55 - camera.position.y);
        this.drawFrame(ctx, 'satge-quai', Math.floor(0 - (camera.position.x / 1.157303)), -14 - camera.position.y);
        // this.drawSmallBollards(ctx, camera);
        this.drawFrame(ctx, 'train', Math.floor(872 - camera.position.x), 120 - camera.position.y);
    }

    drawForeground(ctx, camera){
        this.drawLargeBollards(ctx, camera);
    }

}

// const background = document.querySelector('img[alt="background"]');

// export function drawBackground(ctx) {
//     ctx.drawImage(background, 0, 0);
// }

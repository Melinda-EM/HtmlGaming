import { HitSplash } from './HitSplash.js';

export class MediumHitSplash extends HitSplash {
    constructor(x, y, joueurId, onEnd) {
        super(x, y, joueurId, onEnd);

        this.frames = [
            [[13, 41, 14, 15], [7, 7]],
            [[34, 39, 21, 19], [10, 9]],
            [[64, 39, 21, 19], [10, 9]],
            [[90, 35, 27, 25], [13, 12]],

            [[159, 41, 14, 15], [7, 7]],
            [[182, 39, 21, 19], [10, 9]],
            [[211, 39, 21, 19], [10, 9]],
            [[239, 35, 27, 25], [13, 12]],
        ];
    }

    update(time) {
        super.update(time);
    
    }

    draw(ctx, camera) {
        super.draw(ctx, camera);

    }
}
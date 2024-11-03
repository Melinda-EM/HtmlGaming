import { 
    HEALTH_CRITICAL_HIT_POINTS, 
    HEALTH_DAMAGE_COLOR, 
    HEALTH_MAX_HIT_POINTS, 
    KO_ANIMATION, 
    KO_FLASH_DELAY, 
    TIME_DELAY, 
    TIME_FLASH_DELAY,
    TIME_FRAME_KEYS 
} from '../../constants/battle.js';
import { FPS } from '../../constants/game.js';
import { gameState } from '../../state/gameState.js';
import { drawFrame } from '../../utils/context.js';


export class StatusBar {

    constructor() {
        this.time = 99;
        this.timeTimer= 0;
        this.timeFlashTimer = 0;
        this.useFlashFrames = false;

        this.healthBars = this.createHealthBars();
        this.koFrame = 0;
        this.koAnimationTimer = 0;

        this.frames = this.initializeFrames();
        this.image = document.querySelector('img[alt="misc"]');
        this.names = gameState.fighters.map(({id}) => `tag-${id.toLowerCase()}`);
    }

    createHealthBars() {
        return [{
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }, {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }];
    }

    initializeFrames() {
        return new Map([
            ['vie-bar', [16, 18, 145, 11]],

            ['ko-blanc', [161, 16, 32, 14]],
            ['ko-rouge', [161, 1, 32, 14]],

            ...this.createTimeFrames(),
            ...this.createScoreFrames()
        ]);
    }

    createTimeFrames() {
        const frames = [];
        TIME_FRAME_KEYS.forEach((key, idx) => {
            for (let i = 0; i < 10; i++) {
                frames.push([`${key}-${i}`, [16 + i * 16, 32 + idx * 160, 14, 16]]);
            }
        });
        return frames;
    }

    createScoreFrames() {
        const scoreFrames = [];
        const scoreChars = '0123456789@ABCDEFGHIJKLMNOQRSTUVWXYZ';
        scoreChars.split('').forEach((char, idx) => {
            scoreFrames.push([`score-${char}`, [17 + (idx % 10) * 12, 101 + Math.floor(idx / 10) * 12, 10, 10]]);
        });
        return scoreFrames;
    }

    updateTime(time){
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1;
            this.timeTimer = time.previous;
        }

        if (this.time < 15 && this.time > -1 && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY) {
            this.useFlashFrames = !this.useFlashFrames;
            this.timeFlashTimer = time.previous;
        }
    }

    updateHealthBars(time){
        this.healthBars.forEach((healthBar, index) => {
            const fighter = gameState.fighters[index];
            if (healthBar.hitPoints > fighter.hitPoints) {
                healthBar.hitPoints = Math.max(0, healthBar.hitPoints - (time.secondsPassed * FPS));
            }
        });
    }

    updateKoIcon(time) {
        if (this.healthBars.every(healthBar => healthBar.hitPoints > HEALTH_CRITICAL_HIT_POINTS)) return;
        if (time.previous < this.koAnimationTimer + KO_FLASH_DELAY[this.koFrame]) return;

        this.koFrame = 1 - this.koFrame;
        this.koAnimationTimer = time.previous;
    }

    update(time){
        this.updateTime(time);
        this.updateHealthBars(time);
        this.updateKoIcon(time);
    }

    drawFrame(ctx, frameKey, x, y, direction = 1) {
        const dimensions = this.frames.get(frameKey);
        if (!dimensions) {
            console.error(`Frame ${frameKey} is missing in the frames map`);
            return;
        }
        drawFrame(ctx, this.image, dimensions, x, y, direction);
    }

    drawVieBar(ctx) {
        this.drawFrame(ctx, 'vie-bar', 75, 20);
        this.drawFrame(ctx, KO_ANIMATION[this.koFrame], 220, 18 - this.koFrame);
        this.drawFrame(ctx, 'vie-bar', 397, 20, -1);

        ctx.fillStyle = HEALTH_DAMAGE_COLOR;
        ctx.beginPath();

        this.healthBars.forEach((healthBar, index) => {
            const x = index === 0 ? 76 : 252;
            const width = HEALTH_MAX_HIT_POINTS - Math.floor(healthBar.hitPoints);
            ctx.fillRect(x + (index === 1 ? Math.floor(healthBar.hitPoints) : 0), 21, width, 9);
        });
    }

    drawTime(ctx) {
        const timeString = String(Math.max(this.time, 0)).padStart(2, '00');
        const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)];

        for (let i = 0; i < 2; i++) {
            this.drawFrame(ctx, `${flashFrame}-${timeString.charAt(i)}`, 223 + i * 13, 33);
        }
    }

    drawScoreLabel(ctx, label, x) {
        [...label].forEach((char, index) => {
            this.drawFrame(ctx, `score-${char}`, x + index * 12, 1);
        });
    }

    drawScore(ctx, score, x) {
        const strScore = String(score).padStart(6, '0');
        this.drawScoreLabel(ctx, strScore, x);
    }

    drawScores(ctx) {
        this.drawScoreLabel(ctx, 'P1', 75);
        this.drawScore(ctx, gameState.fighters[0].score, 105);

        this.drawScoreLabel(ctx, 'ANT', 180);
        this.drawScore(ctx, 50000, 217);  // Score fixe pour l'IA

        this.drawScoreLabel(ctx, 'P2', 300);
        this.drawScore(ctx, gameState.fighters[1].score, 329);
    }

    drawGameOverScreen(ctx) {
        if (!this.isGameOver()) return;

        const winner = this.healthBars[0].hitPoints <= 0 ? 'Joueur 2' : 'Joueur 1';

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = 'red';
        ctx.font = '100px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('KO!', ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);

        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText(`${winner} Gagne!`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);

        ctx.font = '20px Arial';
        ctx.fillText('Appuyez sur Espace pour rejouer', ctx.canvas.width / 2, ctx.canvas.height - 50);
    }

    isGameOver() {
        return this.healthBars.some(healthBar => healthBar.hitPoints <= 0);
    }

    reset() {
        this.time = 99; 
        this.timeTimer = 0;
        this.timeFlashTimer = 0;
        this.useFlashFrames = false;
        this.healthBars = this.createHealthBars();
        this.koFrame = 0;
        this.koAnimationTimer = 0;
    }

    draw(ctx) {
        this.drawScores(ctx);
        this.drawVieBar(ctx);
        this.drawTime(ctx);
        this.drawGameOverScreen(ctx);
    }

}

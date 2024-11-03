export class Bonus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.type = this.getRandomType();
    }

    getRandomType() {
        const types = ['health', 'speed', 'power'];
        return types[Math.floor(Math.random() * types.length)];
    }

    draw(ctx) {
        ctx.fillStyle = this.getColor();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getColor() {
        switch(this.type) {
            case 'health': return 'green';
            case 'speed': return 'blue';
            case 'power': return 'red';
            default: return 'yellow';
        }
    }

    applyEffect(fighter) {
        switch(this.type) {
            case 'health':
                fighter.health = Math.min(fighter.health + 20, 100);
                break;
            case 'speed':
                fighter.speed *= 1.5;
                setTimeout(() => fighter.speed /= 1.5, 5000);
                break;
            case 'power':
                fighter.attackPower *= 1.5;
                setTimeout(() => fighter.attackPower /= 1.5, 5000);
                break;
        }
    }
}
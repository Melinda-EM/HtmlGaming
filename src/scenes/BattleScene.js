import { FighterAttackBaseData, FighterAttackStrength, FighterId } from '../constants/fighter.js';
import { STAGE_MID_POINT, STAGE_PADDING } from '../constants/stage.js';
import { Camera } from '../engine/Camera.js';
import { Dio, Jotaro } from '../entities/fighters/index.js';
import { LightHitSplash, MediumHitSplash, HeavyHitSplash, Ombre } from '../entities/fighters/shared/index.js';
import { DioName } from '../entities/overlays/DioName.js';
import { FpsCounter } from '../entities/overlays/FpsCounter.js';
import { JotaroName } from '../entities/overlays/JotaroName.js';
import { StatusBar } from '../entities/overlays/StatusBar.js';
import { Stage0 } from '../entities/stage/Stage0.js';
import { gameState } from '../state/gameState.js';
import { Bonus } from '../../Bonus.js';

export class BattleScene {

    fighters =[];
    camera = undefined;
    shadows = [];
    entities = [];

    constructor() {
        this.stage = new Stage0();
        this.statusBar = new StatusBar();
        this.bonuses = [];
        this.bonusTimer = 0;

        this.overlays = [
            new StatusBar(this.fighters),
            new DioName(this.fighters),
            new JotaroName(this.fighters),
            new FpsCounter(),
        ];

        this.startRound();
    }

    getFighterEntityClass(id) {
        switch (id) {
            case FighterId.DIO:
                return Dio;
            case FighterId.JOTARO:
                return Jotaro;
            default:
                throw new Error('Unknown fighter id request');
        }
    }

    getFighterEntity(fighterState, index) {
        const FighterEntityClass = this.getFighterEntityClass(fighterState.id);
        return new FighterEntityClass(index, this.handleAttackHit.bind(this));
    }

    getFighterEntities() {
        const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));
        
        fighterEntities[0].adversaire = fighterEntities[1];
        fighterEntities[1].adversaire = fighterEntities[0];

        return fighterEntities;
    }

    getHitSplashClass(strength) {
        switch (strength) {
            case FighterAttackStrength.LEGER:
                return LightHitSplash;
            case FighterAttackStrength.MOYEN:
                return MediumHitSplash;
            case FighterAttackStrength.FORT:
                return HeavyHitSplash;
            default:
                throw new Error('Unknown strength request');
        }
    }

    addEntity(EntityClass, ...args) {
        this.entities.push(new EntityClass(...args, this.removeEntity.bind(this)));
    }

    removeEntity(entity) {
        this.entities = this.entities.filter((thisEntity) => thisEntity !== entity);
    }

    handleAttackHit(joueurId, adversaireId, position, strength) {
        gameState.fighters[joueurId].score += FighterAttackBaseData[strength].score;
        gameState.fighters[adversaireId].hitPoints -= FighterAttackBaseData[strength].damage;

        this.addEntity(this.getHitSplashClass(strength), position.x, position.y, joueurId);
    }

    startRound() {
        this.fighters = this.getFighterEntities();
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - 230, 16, this.fighters);
        this.shadows = this.fighters.map(fighter => new Ombre(fighter))
    }

    updateFighters(time, ctx) {
        for (const fighter of this.fighters) {
            fighter.update(time, ctx, this.camera);
        }
    }

    updateShadows(time, ctx) {
        for (const shadow of this.shadows) {
            shadow.update(time, ctx, this.camera);
        }
    }

    updateEntities(time, ctx) {
        for (const entity of this.entities) {
            entity.update(time, ctx, this.camera);
        }
    }

    updateOverlays(time, ctx) {
        for (const overlay of this.overlays) {
            overlay.update(time, ctx, this.camera);
        }
    }

    update(time, ctx) {
        this.updateFighters(time, ctx);
        this.updateShadows(time, ctx);
        this.stage.update(time);
        this.updateEntities(time, ctx);
        this.camera.update(time, ctx);
        this.updateOverlays(time, ctx);

        this.bonusTimer += time.secondsPassed;
        if (this.bonusTimer > 10) {
            this.bonusTimer = 0;
            this.generateBonus()
        }
        this.checkBonusCollisions()
    }

    generateBonus() {
        const x = Math.random() * (this.width - 30);
        const y = this.floor - 30;
        this.bonuses.push(new Bonus(x, y));
    }

    checkBonusCollisions() {
        this.bonuses = this.bonuses.filter(bonus => {
            for (let fighter of this.fighters) {
                if (this.checkCollision(fighter, bonus)) {
                    bonus.applyEffect(fighter);
                    return false;
                }
            }
            return true;
        });
    }

    checkCollision(fighter, bonus) {
        return fighter.x < bonus.x + bonus.width &&
               fighter.x + fighter.width > bonus.x &&
               fighter.y < bonus.y + bonus.height &&
               fighter.y + fighter.height > bonus.y;
    }

    drawFighters(ctx) {
        for (const fighter of this.fighters) {
            fighter.draw(ctx, this.camera);
        }
    }

    drawShadows(ctx) {
        for (const shadow of this.shadows) {
            shadow.draw(ctx, this.camera);
        }
    }

    drawEntities(ctx) {
        for (const entity of this.entities) {
            entity.draw(ctx, this.camera);
        }
    }

    drawOverlays(ctx) {
        for (const overlay of this.overlays) {
            overlay.draw(ctx, this.camera);
        }
    }

    draw(ctx) {
        this.stage.drawBackground(ctx, this.camera);
        this.drawShadows(ctx);
        this.drawFighters(ctx);
        this.drawEntities(ctx);
        this.stage.drawForeground(ctx, this.camera);
        this.drawOverlays(ctx);

        for (let bonus of this.bonuses) {
            bonus.draw(ctx)
        }
    }
}
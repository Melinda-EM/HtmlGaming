// import { Control } from "../../constants/control.js";
import { 
    FIGHTER_START_DISTANCE, 
    FighterDirection, 
    FighterAttackType,
    FighterState, 
    FrameDelay, 
    PUSH_FRICTION, 
    FighterAttackStrength,
} from '../../constants/fighter.js';
import { FRAME_TIME } from '../../constants/game.js';
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING } from '../../constants/stage.js';
import * as control from '../../engine/GestionInput.js';
import { playSound, stopSound } from '../../engine/GestionSound.js';
import { gameState } from '../../state/gameState.js';
import { boxOverlap, getActuelBoxDimensions, rectsOverlap } from '../../utils/collisions.js';
// import { DEBUF_drawCollisionInfo } from '../../utils/fighterDebug.js';

export class Fighter {

    velocity = {x: 0, y: 0};
    initialVelocity = {};

    gravity = 0;

    attackStruck = false;

    frames = new Map();
    animationFrame = 0;
    animationTimer = 0;
    animations = {};

    image = new Image();

    adversaire = undefined;

    boxes = { 
        push: {x: 0, y: 0, width: 0, height: 0},
        hurt: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        hit: {x: 0, y: 0, width: 0, height: 0},
    };

    states = {
        [FighterState.INACTIF]: {
            init: this.handleInactifInit.bind(this),
            update: this.handleInactifState.bind(this),
            validFrom: [
                undefined,
                FighterState.INACTIF, FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE,
                FighterState.SAUT_HAUT, FighterState.SAUT_AVANT, FighterState.SAUT_ARRIERE,
                FighterState.ACCROUPI_HAUT, FighterState.SAUT_ATTERRISSAGE, FighterState.INACTIF_TOURNER,
                FighterState.LEGER_COUP, FighterState.MOYEN_COUP, FighterState.FORT_COUP,
                FighterState.LEGER_KICK, FighterState.MOYEN_KICK, FighterState.FORT_KICK,
            ],
        },
        [FighterState.MARCHANT_AVANT]: {
            init: this.handleBougeInit.bind(this),
            update: this.handleMarcheAvantState.bind(this),
            validFrom: [
                FighterState.INACTIF, FighterState.MARCHANT_ARRIERE,
            ],
        },
        [FighterState.MARCHANT_ARRIERE]: {
            init: this.handleBougeInit.bind(this),
            update: this.handleMarcheArriereState.bind(this),
            validFrom: [
                FighterState.INACTIF, FighterState.MARCHANT_AVANT,
            ],
        },
        [FighterState.SAUT_DEBUT]: {
            init: this.handleSautDebutInit.bind(this),
            update: this.handleSautDebutState.bind(this),
            validFrom: [
                FighterState.INACTIF, FighterState.SAUT_ATTERRISSAGE,
                FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE,
            ],
        },
        [FighterState.SAUT_HAUT]: {
            init: this.handleSautInit.bind(this),
            update: this.handleSautState.bind(this),
            validFrom: [FighterState.SAUT_DEBUT],
        },
        [FighterState.SAUT_AVANT]: {
            init: this.handleSautInit.bind(this),
            update: this.handleSautState.bind(this),
            validFrom: [FighterState.SAUT_DEBUT],
        },
        [FighterState.SAUT_ARRIERE]: {
            init: this.handleSautInit.bind(this),
            update: this.handleSautState.bind(this),
            validFrom: [FighterState.SAUT_DEBUT],
        },
        [FighterState.SAUT_ATTERRISSAGE]: {
            init: this.handleSautAtterrissageInit.bind(this),
            update: this.handleSautAtterrissageState.bind(this),
            validFrom: [
                FighterState.SAUT_HAUT, FighterState.SAUT_AVANT, FighterState.SAUT_ARRIERE,
            ],
        },
        [FighterState.ACCROUPI]: {
            init: ()=> {},
            update: this.handleAccroupiState.bind(this),
            validFrom: [FighterState.ACCROUPI_BAS, FighterState.ACCROUPI_TOURNER,],
        },
        [FighterState.ACCROUPI_BAS]: {
            init: this.handleAccroupiBasInit.bind(this),
            update: this.handleAccroupiBasState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE],
        },
        [FighterState.ACCROUPI_HAUT]: {
            init: ()=> {},
            update: this.handleAccroupiHautState.bind(this),
            validFrom: [FighterState.ACCROUPI],
        },
        [FighterState.INACTIF_TOURNER]: {
            init: ()=> {},
            update: this.handleInactifTournerState.bind(this),
            validFrom: [
                FighterState.INACTIF, FighterState.SAUT_ATTERRISSAGE,
                FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE,
            ],
        },
        [FighterState.ACCROUPI_TOURNER]: {
            init: ()=> {},
            update: this.handleAccroupiTournerState.bind(this),
            validFrom: [FighterState.ACCROUPI],
        },
        [FighterState.LEGER_COUP]: {
            attackType: FighterAttackType.COUP,
            attackStrength: FighterAttackStrength.LEGER,
            init: this.handleAttackInit.bind(this),
            update: this.handleLegerCoupState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE],
        },
        [FighterState.MOYEN_COUP]: {
            attackType: FighterAttackType.COUP,
            attackStrength: FighterAttackStrength.MOYEN,
            init: this.handleAttackInit.bind(this),
            update: this.handleMoyenCoupState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_ARRIERE, FighterState.MARCHANT_AVANT],
        },
        [FighterState.FORT_COUP]: {
            attackType: FighterAttackType.COUP,
            attackStrength: FighterAttackStrength.FORT,
            init: this.handleAttackInit.bind(this),
            update: this.handleMoyenCoupState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_ARRIERE, FighterState.MARCHANT_AVANT],
        },
        [FighterState.LEGER_KICK]: {
            attackType: FighterAttackType.KICK,
            attackStrength: FighterAttackStrength.LEGER,
            init: this.handleAttackInit.bind(this),
            update: this.handleLegerKickState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_ARRIERE, FighterState.MARCHANT_ARRIERE],
        },
        [FighterState.MOYEN_KICK]: {
            attackType: FighterAttackType.KICK,
            attackStrength: FighterAttackStrength.MOYEN,
            init: this.handleAttackInit.bind(this),
            update: this.handleMoyenKickState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_ARRIERE, FighterState.MARCHANT_AVANT],
        },
        [FighterState.FORT_KICK]: {
            attackType: FighterAttackType.KICK,
            attackStrength: FighterAttackStrength.FORT,
            init: this.handleAttackInit.bind(this),
            update: this.handleMoyenKickState.bind(this),
            validFrom: [FighterState.INACTIF, FighterState.MARCHANT_ARRIERE, FighterState.MARCHANT_AVANT],
        },
    };

    soundAttacks = {
        [FighterAttackStrength.LEGER]: document.querySelector('audio#sound-fighter-leger-attack'),
        [FighterAttackStrength.MOYEN]: document.querySelector('audio#sound-fighter-moyen-attack'),
        [FighterAttackStrength.FORT]: document.querySelector('audio#sound-fighter-fort-attack'),
    };

    soundHits = {
        [FighterAttackStrength.LEGER]: {
            [FighterAttackType.COUP]: document.querySelector('audio#sound-fighter-leger-coup-hit'),
            [FighterAttackType.KICK]: document.querySelector('audio#sound-fighter-leger-kick-hit'),
        },
        [FighterAttackStrength.MOYEN]: {
            [FighterAttackType.COUP]: document.querySelector('audio#sound-fighter-moyen-coup-hit'),
            [FighterAttackType.KICK]: document.querySelector('audio#sound-fighter-moyen-kick-hit'),
        },
        [FighterAttackStrength.FORT]: {
            [FighterAttackType.COUP]: document.querySelector('audio#sound-fighter-fort-coup-hit'),
            [FighterAttackType.KICK]: document.querySelector('audio#sound-fighter-fort-kick-hit'),
        },
    };

    soundAtterissage = document.querySelector('audio#sound-fighter-atterissage');

    constructor(joueurId, onAttackHit) {
        this.joueurId = joueurId;
        this.onAttackHit = onAttackHit;

        this.position = { 
            x: STAGE_MID_POINT + STAGE_PADDING + (joueurId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE), 
            y: STAGE_FLOOR 
        };
        this.direction = joueurId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;

        this.changeState(FighterState.INACTIF);

    }

    isAnimationComplete = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;

    hasCollisionLargeurAdversaire = () => rectsOverlap(
        this.position.x + this.boxes.push.x, this.position.y + this.boxes.push.y,
        this.boxes.push.width, this.boxes.push.height,
        this.adversaire.position.x + this.adversaire.boxes.push.x, 
        this.adversaire.position.y + this.adversaire.boxes.push.y,
        this.adversaire.boxes.push.width, this.adversaire.boxes.push.height,
    );

    resetVelocite() {
        this.velocity = {x: 0, y: 0};
    }

    getDirection() {
        if (this.position.x + this.boxes.push.x + this.boxes.push.width 
            <= this.adversaire.position.x + this.adversaire.boxes.push.x
        ) {

            return FighterDirection.RIGHT;

        } else if (this.position.x + this.boxes.push.x 
            >= this.adversaire.position.x + this.adversaire.boxes.push.x + this.adversaire.boxes.push.width
        ) {

            return FighterDirection.LEFT;

        }

        return this.direction;
        
    }

    getBoxes(frameKey) {
        const [, 
            [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
            [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
        ] = this.frames.get(frameKey);

        return {
            push: {x: pushX, y: pushY, width: pushWidth, height: pushHeight},
            hurt: [head, body, feet],
            hit: {x: hitX, y: hitY, width: hitWidth, height: hitHeight},
        };
    }

    changeState(newState){

        if (newState === this.currentState
            || !this.states[newState].validFrom.includes(this.currentState)){
                console.warn(`Illegal transition from "${this.currentState}" to "${newState}"`);
                return;
            }

        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleInactifInit() {
        this.resetVelocite();
        this.attackStruck = false;
    }

    handleBougeInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleSautInit() {
        this.velocity.y = this.initialVelocity.saut;
        this.handleBougeInit();
    }

    handleAccroupiBasInit(){
        this.resetVelocite();
    }

    handleSautDebutInit(){
        this.resetVelocite();
    }

    handleSautAtterrissageInit(){
        this.resetVelocite();
        this.soundAtterissage.play();
    }

    // handleStandardLegerAttackInit(){
    //     this.resetVelocite();
    // }

    // handleStandardMoyenAttackInit(){
    //     this.resetVelocite();
    // }

    // handleStandardFortAttackInit(){
    //     this.resetVelocite();
    // }

    handleAttackInit(){
        this.resetVelocite();
        playSound(this.soundAttacks[this.states[this.currentState].attackStrength]);
    }

    handleInactifState(){
        if (control.isHaut(this.joueurId)) {
            this.changeState(FighterState.SAUT_DEBUT);
        } else if (control.isBas(this.joueurId)) {
            this.changeState(FighterState.ACCROUPI_BAS);
        } else if (control.isArriere(this.joueurId, this.direction)) {
            this.changeState(FighterState.MARCHANT_ARRIERE);
        } else if (control.isAvant(this.joueurId, this.direction)) {
            this.changeState(FighterState.MARCHANT_AVANT);
        } else if (control.isLegerCoup(this.joueurId)) {
            this.changeState(FighterState.LEGER_COUP);
        } else if (control.isMoyenCoup(this.joueurId)) {
            this.changeState(FighterState.MOYEN_COUP);
        } else if (control.isFortCoup(this.joueurId)) {
            this.changeState(FighterState.FORT_COUP);
        } else if (control.isLegerKick(this.joueurId)) {
            this.changeState(FighterState.LEGER_KICK);
        } else if (control.isMoyenKick(this.joueurId)) {
            this.changeState(FighterState.MOYEN_KICK);
        } else if (control.isFortKick(this.joueurId)) {
            this.changeState(FighterState.FORT_KICK);
        }

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.INACTIF_TOURNER);
        }

    }

    handleMarcheAvantState(){
        if (!control.isAvant(this.joueurId, this.direction)) this.changeState(FighterState.INACTIF);
        if (control.isHaut(this.joueurId)) {
            this.changeState(FighterState.SAUT_DEBUT);
        } 
        if (control.isBas(this.joueurId)) this.changeState(FighterState.ACCROUPI_BAS);

        if (control.isLegerCoup(this.joueurId)) {
            this.changeState(FighterState.LEGER_COUP);
        } else if (control.isMoyenCoup(this.joueurId)) {
            this.changeState(FighterState.MOYEN_COUP);
        } else if (control.isFortCoup(this.joueurId)) {
            this.changeState(FighterState.FORT_COUP);
        } else if (control.isLegerKick(this.joueurId)) {
            this.changeState(FighterState.LEGER_KICK);
        } else if (control.isMoyenKick(this.joueurId)) {
            this.changeState(FighterState.MOYEN_KICK);
        } else if (control.isFortKick(this.joueurId)) {
            this.changeState(FighterState.FORT_KICK);
        }
        
        this.direction = this.getDirection();
    }

    handleMarcheArriereState(){
        if (!control.isArriere(this.joueurId, this.direction)) this.changeState(FighterState.INACTIF);
        if (control.isHaut(this.joueurId)) {
            this.changeState(FighterState.SAUT_DEBUT);
        } 
        if (control.isBas(this.joueurId)) this.changeState(FighterState.ACCROUPI_BAS);

        if (control.isLegerCoup(this.joueurId)) {
            this.changeState(FighterState.LEGER_COUP);
        } else if (control.isMoyenCoup(this.joueurId)) {
            this.changeState(FighterState.MOYEN_COUP);
        } else if (control.isFortCoup(this.joueurId)) {
            this.changeState(FighterState.FORT_COUP);
        } else if (control.isLegerKick(this.joueurId)) {
            this.changeState(FighterState.LEGER_KICK);
        } else if (control.isMoyenKick(this.joueurId)) {
            this.changeState(FighterState.MOYEN_KICK);
        } else if (control.isFortKick(this.joueurId)) {
            this.changeState(FighterState.FORT_KICK);
        }
        
        this.direction = this.getDirection();
    }

    handleSautState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;

        if (this.position.y > STAGE_FLOOR){
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.SAUT_ATTERRISSAGE);
        }
    }

    handleAccroupiState(){
        if (!control.isBas(this.joueurId)) this.changeState(FighterState.ACCROUPI_HAUT);
    
        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.ACCROUPI_TOURNER);
        }
    
    }

    handleAccroupiBasState() {
        if (this.isAnimationComplete()){
            
            this.changeState(FighterState.ACCROUPI);
        }

        if ( !control.isBas(this.joueurId)) {
            this.changeState(FighterState.ACCROUPI_HAUT);
            this.animationFrame = this.animations[FighterState.ACCROUPI_HAUT][this.animationFrame].length
             - this.animationFrame;
        }
    }

    handleAccroupiHautState() {
        if (this.isAnimationComplete()){
            
            this.changeState(FighterState.INACTIF);
        }
    }

    handleSautDebutState(){
        if (this.isAnimationComplete()){
            
            if (control.isArriere(this.joueurId, this.direction)) {

                this.changeState(FighterState.SAUT_ARRIERE);

            } else if (control.isAvant(this.joueurId, this.direction)) {

                this.changeState(FighterState.SAUT_AVANT);

            } else {

                this.changeState(FighterState.SAUT_HAUT);
            }
        }
    }

    handleSautAtterrissageState(){

        if (this.animationFrame < 1 ) return;

        let newState = FighterState.INACTIF;

        if (!control.isInactif(this.joueurId)) {
            this.direction = this.getDirection();

            this.handleInactifState();
        } else {
            const newDirection = this.getDirection();

            if (newDirection !== this.direction) {
                this.direction = newDirection;
                newState = FighterState.INACTIF_TOURNER;
            }  else {
                if (!this.isAnimationComplete()) return;
            }
        }

        this.changeState(newState);

    }

    handleInactifTournerState(){
        this.handleInactifInit();

        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.INACTIF);
    }

    handleAccroupiTournerState(){
        this.handleAccroupiState();

        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.ACCROUPI);
    }

    handleLegerAttackReset() {
        this.animationFrame = 0;
        this.handleAttackInit();
        this.attackStruck = false;
    }

    handleLegerCoupState(){
        if (this.animationFrame < 2) return;
        if (control.isLegerCoup(this.joueurId)) this.handleLegerAttackReset();

        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.INACTIF);
    }

    handleMoyenCoupState(){
        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.INACTIF);
    }

    // handleFortCoupState(){
    //     if (!this.isAnimationComplete()) return;
    //     this.changeState(FighterState.INACTIF);
    // }

    handleLegerKickState(){
        if (this.animationFrame < 2) return;
        if (control.isLegerKick(this.joueurId)) this.handleLegerAttackReset();

        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.INACTIF);
    }

    handleMoyenKickState(){
        if (!this.isAnimationComplete()) return;
        this.changeState(FighterState.INACTIF);
    }

    // handleFortKickState(){
    //     if (!this.isAnimationComplete()) return;
    //     this.changeState(FighterState.INACTIF);
    // }

    updateStageConstraintes(time, ctx, camera) {

        // const WIDTH = 32;

        if (this.position.x > camera.position.x + ctx.canvas.width - this.boxes.push.width) {
            
            this.position.x = camera.position.x + ctx.canvas.width - this.boxes.push.width;
        }

        if (this.position.x < camera.position.x + this.boxes.push.width){
            
            this.position.x = camera.position.x + this.boxes.push.width;
        }

        if (this.hasCollisionLargeurAdversaire()) {
            if (this.position.x <= this.adversaire.position.x) {
                this.position.x = Math.max(
                    (this.adversaire.position.x + this.adversaire.boxes.push.x) - (this.boxes.push.x + this.boxes.push.width),
                    camera.position.x + this.boxes.push.width,
                );

                if ([
                    FighterState.INACTIF, FighterState.ACCROUPI, FighterState.SAUT_HAUT,
                    FighterState.SAUT_AVANT, FighterState.SAUT_ARRIERE,
                ].includes(this.currentState)) {
                    this.adversaire.position.x += PUSH_FRICTION * time.secondsPassed;
                }
            }

            if (this.position.x >= this.adversaire.position.x) {
                this.position.x = Math.min(
                    (this.adversaire.position.x + this.adversaire.boxes.push.x + this.adversaire.boxes.push.width) 
                    + (this.boxes.push.width + this.boxes.push.x),
                    camera.position.x + ctx.canvas.width - this.boxes.push.width,
                );

                if ([
                    FighterState.INACTIF, FighterState.ACCROUPI, FighterState.SAUT_HAUT,
                    FighterState.SAUT_AVANT, FighterState.SAUT_ARRIERE,
                ].includes(this.currentState)) {
                    this.adversaire.position.x -= PUSH_FRICTION * time.secondsPassed;
                }
            }
        }
    }

    updateAnimation (time) {

        const animation = this.animations[this.currentState];
        const [, frameDelay] = animation[this.animationFrame];

        if(time.previous <= this.animationTimer + frameDelay * FRAME_TIME) return;
        this.animationTimer = time.previous;

        if(frameDelay <= FrameDelay.FREEZE) return;

        this.animationFrame++;
        if(this.animationFrame >= animation.length) this.animationFrame = 0;

        this.boxes = this.getBoxes(animation[this.animationFrame][0]);
        
    }

    updateAttackBoxCollision() {
        const { attackStrength, attackType } = this.states[this.currentState];
    
        if (!attackType || this.attackStruck) return;
    
        const actuelHitBox = getActuelBoxDimensions(this.position, this.direction, this.boxes.hit);
    
        for (const hurt of this.adversaire.boxes.hurt) {
            const [x, y, width, height] = hurt;
            const actuelAdversaireHurtBox = getActuelBoxDimensions(
                this.adversaire.position, 
                this.adversaire.direction, 
                {x, y, width, height},
            );
    
            if (boxOverlap(actuelHitBox, actuelAdversaireHurtBox)) {
                stopSound(this.soundAttacks[attackStrength]);
                playSound(this.soundHits[attackStrength][attackType]);
                
                const hurtIndex = this.adversaire.boxes.hurt.indexOf(hurt);
                const hurtName = ['head', 'body', 'feet'];
                const strength = this.states[this.currentState].attackStrength;
    
                const hitPosition = {
                    x: (actuelHitBox.x + (actuelHitBox.width / 2) + actuelAdversaireHurtBox.x + (actuelAdversaireHurtBox.width / 2)) / 2,
                    y: (actuelHitBox.y + (actuelHitBox.height / 2) + actuelAdversaireHurtBox.y + (actuelAdversaireHurtBox.height / 2)) / 2,
                }
                hitPosition.x -= 4 - Math.random() * 8;
                hitPosition.y -= 4 - Math.random() * 8;
    
                this.onAttackHit(
                    this.joueurId, this.adversaire.joueurId, hitPosition, 
                    this.states[this.currentState].attackStrength,
                );
    
                console.log(`${gameState.fighters[this.joueurId].id} has hit ${gameState.fighters[this.adversaire.joueurId].id}'s ${hurtName[hurtIndex]}`);
    
                this.attackStruck = true;
                return; 
            }
        }
    }

    update(time, ctx, camera) {

        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;

        // if (
        //     [FighterState.INACTIF, FighterState.MARCHANT_AVANT, FighterState.MARCHANT_ARRIERE]
        //         .includes(this.currentState)
        // ){
        //     this.direction = this.getDirection();
        // }

        this.states[this.currentState].update(time, ctx);
        this.updateAnimation(time);
        this.updateStageConstraintes(time, ctx, camera);
        this.updateAttackBoxCollision(time);
    }

    

    draw(ctx, camera) {

        const [frameKey] = this.animations[this.currentState][this.animationFrame];

        const [[
            [x, y, width, height],
            [originX, originY],
        ]] = this.frames.get(frameKey);

        ctx.scale(this.direction, 1);
        ctx.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.direction) - originX, 
            Math.floor(this.position.y - camera.position.y) - originY,
            width, height
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // DEBUF_drawCollisionInfo(this,ctx, camera);
    }
}
import { FrameDelay, FighterState, PushBox, HurtBox } from '../../constants/fighter.js';
import { Fighter } from './Fighter.js';

export class Jotaro extends Fighter {
    constructor(joueurId, onAttackHit) {
        super(joueurId, onAttackHit);
        
        this.image = document.querySelector('img[alt="jotaro"]');
        this.frames = new Map([

            ['inactif-1',[[[20, 12, 40, 60], [17, 56]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-2',[[[94, 11, 40, 60], [19, 56]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-3',[[[167, 11, 40, 60], [21, 56]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-4',[[[242, 11, 40, 60], [21, 56]], PushBox.INACTIF, HurtBox.INACTIF]],

            ['avance-1',[[[20, 12, 35, 60], [16, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-2',[[[540, 12, 40, 59], [14, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-3',[[[612, 10, 47, 57], [16, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-4',[[[690, 13, 40, 55], [11, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-5',[[[90, 90, 43, 57], [21, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],

            ['recule-1',[[[626, 636, 60, 60], [15, 55]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-2',[[[395, 792, 60, 60], [15, 55]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-3',[[[470, 796, 60, 60], [15, 55]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-4',[[[470, 796, 60, 60], [15, 55]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-5',[[[395, 792, 60, 60], [15, 55]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],

            ['saut-haut-1',[[[323, 183, 40, 60], [18, 45]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-2',[[[391, 167, 50, 60], [18, 45]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-3',[[[17, 167, 45, 60], [18, 57]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-4',[[[167, 166, 45, 60], [13, 50]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-5',[[[239, 177, 45, 60], [25, 47]], PushBox.SAUT, HurtBox.SAUT]],

            ['saut-roue-1',[[[621, 340, 40, 60], [20, 55]], PushBox.SAUT, [[1, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-2',[[[19, 420, 60, 60], [20, 55]], PushBox.SAUT, [[-5, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-3',[[[94, 421, 40, 60], [20, 55]], PushBox.SAUT, [[-10, -35, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-4',[[[170, 419, 40, 60], [20, 55]], PushBox.SAUT, [[-14, -47, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-5',[[[246, 418, 40, 60], [20, 55]], PushBox.SAUT, [[-20, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],

            ['saut-atterrissage',[[[239, 177, 50, 60], [25, 45]], PushBox.INACTIF, HurtBox.INACTIF]],

            ['accroupi-1',[[[323, 183, 40, 60], [20, 37]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['accroupi-2',[[[92, 730, 60, 60], [20, 37]], PushBox.PLIER, HurtBox.PLIER]],
            ['accroupi-3',[[[246, 732, 40, 60], [20, 37]], PushBox.ACCROUPI, HurtBox.ACCROUPI]],

            ['inactif-tourner-1',[[[20, 12, 40, 60], [20, 56]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['inactif-tourner-2',[[[94, 11, 40, 60], [20, 56]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['inactif-tourner-3',[[[167, 11, 40, 60], [20, 56]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],

            ['accroupi-tourner-1',[[[323, 183, 40, 60], [20, 37]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],
            ['accroupi-tourner-2',[[[92, 730, 60, 60], [20, 37]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],
            ['accroupi-tourner-3',[[[246, 732, 40, 60], [20, 37]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],

            ['leger-coup-1',[[[394, 714, 35, 56], [20, 56]], PushBox.INACTIF, HurtBox.COUP]],
            ['leger-coup-2',[[[545, 714, 42, 56], [20, 56]], PushBox.INACTIF, HurtBox.COUP, [8, -47, 16, 12]]],

            ['moyen-coup-1',[[[355, 1419, 38, 52], [20, 52]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['moyen-coup-2',[[[398, 1420, 45, 51], [20, 52]], PushBox.INACTIF, HurtBox.COUP]],
            ['moyen-coup-3',[[[446, 1420, 47, 51], [20, 52]], PushBox.INACTIF, HurtBox.COUP, [10, -45, 18, 15]]],

            ['fort-coup-1',[[[465, 714, 53, 56], [20, 56]], PushBox.INACTIF, HurtBox.COUP, [8, -47, 25, 18]]],
            
            ['leger-kick-1',[[[395, 792, 31, 56], [20, 56]], PushBox.INACTIF, [[11, -14, 11, 11], [-10, -62, 25, 32], [-10, -29, 25, 28]]]],
            ['leger-kick-2',[[[470, 796, 27, 52], [20, 56]], PushBox.INACTIF, [[11, -14, 11, 11], [-10, -62, 25, 32], [-10, -29, 25, 28]]]],
            ['leger-kick-3',[[[687, 793, 42, 56], [20, 56]], PushBox.INACTIF, [[11, -14, 11, 11], [-10, -62, 25, 32], [-10, -29, 25, 28]], [10, -20, 18, 18]]],

            ['moyen-kick-1',[[[616, 793, 62, 55], [20, 56]], PushBox.INACTIF, [[10, -35, 16, 10], [-10, -62, 25, 32], [-10, -29, 25, 28]], [11, -44, 17, 10]]],

            ['fort-kick-1',[[[544, 792, 53, 56], [20, 56]], PushBox.INACTIF, [[16, -30, 18, 15], [-10, -62, 25, 32], [-10, -29, 25, 28]], [15, -30, 18, 17]]],
        ]);

        this.animations ={
            [FighterState.INACTIF]: [
                ['inactif-1',4], ['inactif-2',4], ['inactif-3',4],
                ['inactif-4',4], ['inactif-4',4],
            ],
            [FighterState.MARCHANT_AVANT]: [
                ['avance-1',3], ['avance-2',6], ['avance-3',4],
                ['avance-4',4], ['avance-5',6],
            ],
            [FighterState.MARCHANT_ARRIERE]: [
                ['recule-1',3], ['recule-2',6], ['recule-3',4],
                ['recule-4',4], ['recule-5',6],
            ],
            [FighterState.SAUT_DEBUT]: [
                ['saut-atterrissage',3], ['saut-atterrissage', FrameDelay.TRANSITION],
            ],
            [FighterState.SAUT_HAUT]: [
                ['saut-haut-2',8], ['saut-haut-2',8], ['saut-haut-2',8],
                ['saut-haut-2',8], ['saut-haut-2', FrameDelay.FREEZE],
            ],
            [FighterState.SAUT_AVANT]: [
                ['saut-roue-1',13], ['saut-roue-2',5], ['saut-roue-3',3],
                ['saut-roue-4',5], ['saut-roue-5', FrameDelay.FREEZE],
            ],[FighterState.SAUT_ARRIERE]: [
                ['saut-roue-1',15], ['saut-roue-2',3], ['saut-roue-3',3],
                ['saut-roue-4',3], ['saut-roue-5', FrameDelay.FREEZE],
            ],[FighterState.SAUT_ATTERRISSAGE]: [
                ['saut-atterrissage',2], ['saut-atterrissage',5],
                ['saut-atterrissage', FrameDelay.TRANSITION],
            ],
            [FighterState.ACCROUPI]: [['accroupi-3', FrameDelay.FREEZE]],
            [FighterState.ACCROUPI_BAS]: [
                ['accroupi-1', 2], ['accroupi-2', 2], ['accroupi-3', 2],
                ['accroupi-3', FrameDelay.TRANSITION],
            ],
            [FighterState.ACCROUPI_HAUT]: [
                ['accroupi-3', 2], ['accroupi-2', 2], ['accroupi-1', 2],
                ['accroupi-1', FrameDelay.TRANSITION],
            ],
            [FighterState.INACTIF_TOURNER]: [
                ['inactif-tourner-3',2], ['inactif-tourner-2',2],
                ['inactif-tourner-1',2], ['inactif-tourner-1', FrameDelay.TRANSITION],
            ],
            [FighterState.ACCROUPI_TOURNER]: [
                ['accroupi-tourner-3',2], ['accroupi-tourner-2',2],
                ['accroupi-tourner-1',2], ['accroupi-tourner-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LEGER_COUP]: [
                ['leger-coup-1', 2], ['leger-coup-2', 4],
                ['leger-coup-1', 4], ['leger-coup-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MOYEN_COUP]: [
                ['moyen-coup-1', 1], ['moyen-coup-2', 2], ['moyen-coup-3', 4],
                ['moyen-coup-2', 3], ['moyen-coup-1', 3],
                ['moyen-coup-1', FrameDelay.TRANSITION],
            ],
            [FighterState.FORT_COUP]: [
                ['leger-coup-1', 3], ['leger-coup-2', 2], ['fort-coup-1', 6],
                ['leger-coup-2', 10], ['leger-coup-1', 12],
                ['leger-coup-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LEGER_KICK]: [
                ['leger-kick-1', 3], ['leger-kick-1', 4], ['leger-kick-3', 8],
                ['leger-kick-1', 1], 
                ['leger-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MOYEN_KICK]: [
                ['leger-kick-1', 5], ['leger-kick-2', 6], ['moyen-kick-1', 12],
                ['moyen-kick-1', 7],
                ['moyen-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.FORT_KICK]: [
                ['leger-kick-1', 2], ['leger-kick-2', 4], ['leger-kick-2', 8],
                ['fort-kick-1', 7],
                ['fort-kick-1', FrameDelay.TRANSITION],
            ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.MARCHANT_AVANT]: 3 * 60,
                [FighterState.MARCHANT_ARRIERE]: -(2 * 60),
                [FighterState.SAUT_AVANT]: ((48 * 3) + (12 * 2)),
                [FighterState.SAUT_ARRIERE]: -((45 * 4) + (15 * 3)),
            },
            saut: -420,
        };

        this.gravity = 1000;
    }
}

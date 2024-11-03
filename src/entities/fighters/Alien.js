import { FrameDelay, FighterState, PushBox, HurtBox } from '../../constants/fighter.js';
import { Fighter } from './Fighter.js';

export class Alien extends Fighter {

    constructor(joueurId, onAttackHit) {

        super(joueurId, onAttackHit);

        this.image = document.querySelector('img[alt="alien"]');

        this.frames = new Map([

            ['inactif-1',[[[127, 22, 30, 60], [10, 60]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-2',[[[217, 22, 30, 60], [10, 60]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-3',[[[308, 21, 30, 60], [10, 60]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['inactif-4',[[[263, 2004, 30, 60], [10, 60]], PushBox.INACTIF, HurtBox.INACTIF]],

            ['avance-1',[[[573, 1095, 60, 64], [12, 60]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-2',[[[659, 1099, 45, 60], [13, 60]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-3',[[[754, 1098, 40, 60], [14, 55]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-4',[[[573, 1095, 50, 55], [40, 50]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],
            ['avance-5',[[[659, 1099, 40, 55], [28, 53]], PushBox.INACTIF, HurtBox.MARCHANT_AVANT]],

            ['recule-1',[[[309, 800, 60, 60], [20, 60]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-2',[[[392, 508, 60, 60], [20, 60]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-3',[[[391, 801, 60, 60], [10, 60]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-4',[[[846, 801, 60, 60], [10, 60]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],
            ['recule-5',[[[36, 897, 60, 60], [10, 60]], PushBox.INACTIF, HurtBox.MARCHANT_ARRIERE]],

            ['saut-haut-1',[[[198, 395, 50, 60], [12, 60]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-2',[[[291, 388, 60, 60], [30, 60]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-3',[[[395, 432, 40, 60], [20, 55]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-4',[[[485, 433, 40, 60], [20, 55]], PushBox.SAUT, HurtBox.SAUT]],
            ['saut-haut-5',[[[667, 440, 40, 60], [20, 55]], PushBox.SAUT, HurtBox.SAUT]],

            ['saut-roue-1',[[[395, 432, 40, 60], [20, 55]], PushBox.SAUT, [[1, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-2',[[[485, 433, 60, 60], [20, 55]], PushBox.SAUT, [[-5, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-3',[[[667, 440, 40, 60], [20, 55]], PushBox.SAUT, [[-10, -35, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-4',[[[761, 435, 40, 60], [20, 55]], PushBox.SAUT, [[-14, -47, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],
            ['saut-roue-5',[[[843, 441, 40, 60], [20, 55]], PushBox.SAUT, [[-20, -55, 15, 15], [-15, -44, 32, 15], [-1, -55, 20, 8]]]],

            ['saut-atterrissage',[[[30, 1367, 50, 80], [14, 75]], PushBox.INACTIF, HurtBox.INACTIF]],

            ['accroupi-1',[[[188, 718, 40, 60], [37, 33]]], PushBox.INACTIF, HurtBox.INACTIF],
            ['accroupi-2',[[[276, 726, 60, 60], [37, 33]], PushBox.PLIER, HurtBox.PLIER]],
            ['accroupi-3',[[[367, 729, 60, 60], [37, 33]], PushBox.ACCROUPI, HurtBox.ACCROUPI]],

            ['inactif-tourner-1',[[[127, 22, 30, 60], [10, 60]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['inactif-tourner-2',[[[217, 22, 30, 60], [10, 60]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['inactif-tourner-3',[[[308, 21, 30, 60], [10, 60]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],

            ['accroupi-tourner-1',[[[188, 718, 40, 60], [37, 33]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],
            ['accroupi-tourner-2',[[[276, 726, 60, 60], [37, 33]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],
            ['accroupi-tourner-3',[[[367, 729, 60, 60], [37, 33]], PushBox.ACCROUPI, [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]]]],

            ['leger-coup-1',[[[483, 701, 24, 62], [13, 61]], PushBox.INACTIF, HurtBox.COUP]],
            ['leger-coup-2',[[[667, 701, 41, 62], [13, 61]], PushBox.INACTIF, HurtBox.COUP, [8, -52, 20, 15]]],

            ['moyen-coup-1',[[[300, 2009, 41, 58], [20, 57]], PushBox.INACTIF, HurtBox.INACTIF]],
            ['moyen-coup-2',[[[347, 2011, 40, 58], [20, 57]], PushBox.INACTIF, HurtBox.COUP]],
            ['moyen-coup-3',[[[394, 2010, 40, 58], [20, 57]], PushBox.INACTIF, HurtBox.COUP, [8, -45, 15, 10]]],

            ['fort-coup-1',[[[576, 702, 41, 61], [13, 61]], PushBox.INACTIF, HurtBox.COUP, [8, -52, 20, 15]]],

            ['leger-kick-1',[[[490, 907, 36, 51], [10, 50]], PushBox.INACTIF, [[16, -40, 22, 18], [-10, -62, 25, 32], [-10, -29, 25, 28]]]],
            ['leger-kick-2',[[[580, 919, 50, 48], [10, 50]], PushBox.INACTIF, [[16, -40, 22, 18], [-10, -62, 25, 32], [-10, -29, 25, 28]], [16, -40, 22, 18]]],

            ['moyen-kick-1',[[[452, 1466, 27, 63], [10, 60]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['moyen-kick-2',[[[530, 1467, 39, 61], [10, 60]], PushBox.INACTIF, [[16, -52, 28, 17], [-10, -62, 25, 32], [-10, -29, 25, 28]], [16, -52, 28, 17]]],
            ['moyen-kick-3',[[[605, 1468, 59, 60], [10, 60]], PushBox.INACTIF, [[-12, -60, 20, 18], [-10, -62, 25, 22], [-10, -29, 25, 28]]]],

            ['fort-kick-1',[[[490, 907, 36, 51], [13, 61]], PushBox.INACTIF, [[-12, -60, 20, 22], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
            ['fort-kick-2',[[[580, 919, 50, 48], [13, 61]], PushBox.INACTIF, [[22, -30, 20, 22], [-10, -42, 25, 12], [-10, -29, 25, 28]], [22, -30, 20, 22]]],
            ['fort-kick-3',[[[670, 897, 58, 60], [15, 61]], PushBox.INACTIF, [[22, -60, 20, 40], [-10, -42, 25, 12], [-10, -29, 25, 28]], [22, -60, 20, 40]]],
            ['fort-kick-4',[[[747, 894, 39, 63], [25, 61]], PushBox.INACTIF, [[-32, -60, 20, 18], [-10, -42, 25, 12], [-10, -29, 25, 28]]]],
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
                ['recule-1',3], ['recule-2',4], ['recule-3',4],
                ['recule-4',4], ['recule-5',6],
            ],
            [FighterState.SAUT_DEBUT]: [
                ['saut-atterrissage',3], ['saut-atterrissage', FrameDelay.TRANSITION],
            ],
            [FighterState.SAUT_HAUT]: [
                ['saut-haut-1',8], ['saut-haut-1',8], ['saut-haut-1',8],
                ['saut-haut-1',8], ['saut-haut-1', FrameDelay.FREEZE],
            ],
            [FighterState.SAUT_AVANT]: [
                ['saut-roue-1',13], ['saut-roue-2',5], ['saut-roue-3',3],
                ['saut-roue-4',3], ['saut-roue-5', FrameDelay.FREEZE],
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
                ['accroupi-tourner-3', 2], ['accroupi-tourner-2', 2],
                ['accroupi-tourner-1', 2], ['accroupi-tourner-1', FrameDelay.TRANSITION],
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
                ['leger-kick-1', 3], ['leger-kick-2', 3],
                ['leger-kick-1', 8], ['leger-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.MOYEN_KICK]: [
                ['moyen-kick-1', 5], ['moyen-kick-2', 6], ['moyen-kick-3', 12],
                ['moyen-kick-2', 7], ['moyen-kick-1', 7],
                ['moyen-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.FORT_KICK]: [
                ['fort-kick-1', 2], ['fort-kick-2', 4], ['fort-kick-3', 8],
                ['fort-kick-4', 10], ['fort-kick-1', 7],
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
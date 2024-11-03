import { ManetteStick, Control } from '../constants/control.js';

export const controls = [
    {
        gamePad: {
            [ManetteStick.ZONE_MORTE]: 0.5,
            [ManetteStick.HORIZONTAL_AXE_ID]: 0,
            [ManetteStick.VERTICAL_AXE_ID]: 1,

            [Control.DROITE]: 14,
            [Control.GAUCHE]: 15,
            [Control.HAUT]: 12,
            [Control.BAS]: 13,
            [Control.LEGER_COUP]: 2,
            [Control.MOYEN_COUP]: 3,
            [Control.FORT_COUP]: 5,
            [Control.LEGER_KICK]: 0,
            [Control.MOYEN_KICK]: 1,
            [Control.FORT_KICK]: 7,
        },

        keyboard: {
            [Control.DROITE]: 'ArrowLeft',
            [Control.GAUCHE]: 'ArrowRight',
            [Control.HAUT]: 'ArrowUp',
            [Control.BAS]: 'ArrowDown',
            [Control.LEGER_COUP]: 'Numpad3',
            [Control.MOYEN_COUP]: 'Numpad2',
            [Control.FORT_COUP]: 'Numpad1',
            [Control.LEGER_KICK]: 'Numpad6',
            [Control.MOYEN_KICK]: 'Numpad5',
            [Control.FORT_KICK]: 'Numpad4',
        },
    },
    {
        gamePad: {
            [ManetteStick.ZONE_MORTE]: 0.5,
            [ManetteStick.HORIZONTAL_AXE_ID]: 0,
            [ManetteStick.VERTICAL_AXE_ID]: 1,

            [Control.DROITE]: 14,
            [Control.GAUCHE]: 15,
            [Control.HAUT]: 12,
            [Control.BAS]: 13,
            [Control.LEGER_COUP]: 2,
            [Control.MOYEN_COUP]: 3,
            [Control.FORT_COUP]: 5,
            [Control.LEGER_KICK]: 0,
            [Control.MOYEN_KICK]: 1,
            [Control.FORT_KICK]: 7,
        },
        keyboard: {
            [Control.DROITE]: 'KeyD',
            [Control.GAUCHE]: 'KeyA',
            [Control.HAUT]: 'KeyW',
            [Control.BAS]: 'KeyS',
            [Control.LEGER_COUP]: 'KeyK',
            [Control.MOYEN_COUP]: 'KeyJ',
            [Control.FORT_COUP]: 'KeyH',
            [Control.LEGER_KICK]: 'KeyI',
            [Control.MOYEN_KICK]: 'KeyU',
            [Control.FORT_KICK]: 'KeyY',
        },
    }
];
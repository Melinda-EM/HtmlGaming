export const PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;

export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
}

export const FighterId = {
    DIO: 'Dio',
    JOTARO: 'Jotaro',
    ALIEN: 'Alien',
}

export const FighterAttackType = {
    COUP: 'coup',
    KICK: 'kick',
}

export const FighterAttackStrength = {
    LEGER: 'leger',
    MOYEN: 'moyen',
    FORT: 'fort',
}

export const FighterAttackBaseData = {
    [FighterAttackStrength.LEGER]: {
        score: 100,
        damage: 12,
    },
    [FighterAttackStrength.MOYEN]: {
        score: 300,
        damage: 20,
    },
    [FighterAttackStrength.FORT]: {
        score: 500,
        damage: 28,
    }
}

export const FighterState = {
    INACTIF: 'inactif',
    MARCHANT_AVANT: 'marcheAvant',
    MARCHANT_ARRIERE: 'marcheArriere',
    SAUT_DEBUT: 'sautDebut',
    SAUT_HAUT: 'sautHaut',
    SAUT_AVANT: 'sautAvant',
    SAUT_ARRIERE: 'sautArriere',
    SAUT_ATTERRISSAGE: 'sautAtterrissage',
    ACCROUPI: 'accroupi',
    ACCROUPI_BAS: 'accroupiBas',
    ACCROUPI_HAUT: 'accroupiHaut',
    INACTIF_TOURNER: 'inactifTourner',
    ACCROUPI_TOURNER: 'accroupiTourner',
    LEGER_COUP: 'legerCoup',
    MOYEN_COUP: 'moyenCoup',
    FORT_COUP: 'fortCoup',
    LEGER_KICK: 'legerKick',
    MOYEN_KICK: 'moyenKick',
    FORT_KICK: 'fortKick',
}

export const FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
}

export const PushBox = {
    INACTIF: [-10, -50, 22, 48],
    SAUT: [-18, -52, 40, 50],
    PLIER: [-16, -28, 22, 28],
    ACCROUPI: [-16, -40, 35, 40],
}

export const HurtBox = {
    INACTIF: [[-11, -57, 18, 14], [-10, -42, 23, 12], [-10, -29, 23, 28]],
    MARCHANT_AVANT: [[1, -60, 20, 18], [-20, -42, 45, 12], [-20, -29, 45, 28]],
    MARCHANT_ARRIERE: [[-12, -60, 20, 18], [-15, -42, 35, 12], [-15, -29, 35, 28]],
    SAUT: [[2, -60, 20, 18], [-15, -42, 42, 12], [-15, -29, 30, 28]],
    PLIER: [[-6, -58, 18, 15], [-10, -42, 25, 12], [-10, -29, 25, 28]],
    ACCROUPI: [[-6, -40, 16, 13], [-15, -15, 30, 15], [-15, -26, 30, 10]],
    COUP: [[-6, -58, 18, 15], [-10, -42, 20, 12], [-10, -29, 20, 28]],
}
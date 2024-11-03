import { FighterId } from '../constants/fighter.js';
import { createDefaultFighterState } from './fighterState.js';

export const gameState = {
    fighters : [
        createDefaultFighterState(FighterId.DIO),
        createDefaultFighterState(FighterId.JOTARO),
    ],
};
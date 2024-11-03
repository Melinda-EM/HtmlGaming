import { ManetteStick, Control } from './../constants/control.js';
import { controls } from '../config/controls.js';
import { FighterDirection } from './../constants/fighter.js';

const gestionKeys = new Set();
const pressedKeys = new Set();

const gamePads = new Map();
const pressedButtons = new Set();

const mappedKeys = controls.map(({keyboard}) => Object.values(keyboard)).flat();

function gestionKeyBas(event) {
    if (!mappedKeys.includes(event.code)) return;

    event.preventDefault();

    gestionKeys.add(event.code);
}

function gestionKeyHaut(event) {
    if (!mappedKeys.includes(event.code)) return;
    
    event.preventDefault();

    gestionKeys.delete(event.code);
    pressedKeys.delete(event.code);
}

function gestionGamepadConnecte(event) {
    const { gamepad: {index, axes, buttons} } = event;

    gamePads.set(index, {axes, buttons});
}

function gestionGamepadDeconnecte(event) {
    const { gamepad: {index} } = event;

    gamePads.delete(index);
}

export function enregisterClavierEvents(){
    window.addEventListener('keydown', gestionKeyBas);
    window.addEventListener('keyup', gestionKeyHaut);
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
           
            const restartEvent = new Event('restart'); 
            window.dispatchEvent(restartEvent); 
        }
    });
}

export function enregisterManetteEvents(){
    window.addEventListener('gamepadconnected', gestionGamepadConnecte);
    window.addEventListener('gamepaddisconnected', gestionGamepadDeconnecte);
}

export function pollGamepads(){
    for (const gamePad of navigator.getGamepads()) {
        if(!gamePad) continue;

        if(gamePads.has(gamePad.index)) {
            const { index, axes, buttons } = gamePad;

            gamePads.set(index, {axes, buttons});

            for (const button in buttons) {
                const key = `${gamePad.index}-${button}`;

                if (pressedButtons.has(key) && isBouttonHaut(gamePad.index, button)) {
                    pressedButtons.delete(key);
                }
            }
        }
    }
}

export const isKeyBas = (code) => gestionKeys.has(code);
export const isKeyHaut = (code) => !gestionKeys.has(code);

export function isKeyPressed(code) {
    if (gestionKeys.has(code) && !pressedKeys.has(code)) {
        pressedKeys.add(code);
        return true;
    }

    return false;
}

export const isBouttonBas = (padId, button) => gamePads.get(padId)?.buttons[button].pressed;
export const isBouttonHaut = (padId, button) => !gamePads.get(padId)?.buttons[button].pressed;

export function isBouttonPressed(padId, button) {
    const key = `${padId}-${button}`;

    if (isBouttonBas(padId, button) && !pressedButtons.has(key)) {
        pressedButtons.add(key);
        return true;
    }

    return false;
}

export const isAxePlusGrand = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] >= value;
export const isAxePlusPetit = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] <= value;

export const isControleBas = (id, controle) => isKeyBas(controls[id].keyboard[controle]) 
|| isBouttonBas(id, controls[id].gamePad[controle]);

export const isControlePressed = (id, controle) => isKeyPressed(controls[id].keyboard[controle]) 
|| isBouttonPressed(id, controls[id].gamePad[controle]);

export const isDroite = (id) => isKeyBas(controls[id].keyboard[Control.DROITE])
    || isBouttonBas(id, controls[id].gamePad[Control.DROITE])
    || isAxePlusPetit(id,
        controls[id].gamePad[ManetteStick.HORIZONTAL_AXE_ID],
        -controls[id].gamePad[ManetteStick.ZONE_MORTE],
    );

export const isGauche = (id) => isKeyBas(controls[id].keyboard[Control.GAUCHE])
    || isBouttonBas(id, controls[id].gamePad[Control.GAUCHE])
    || isAxePlusGrand(id,
        controls[id].gamePad[ManetteStick.HORIZONTAL_AXE_ID],
        controls[id].gamePad[ManetteStick.ZONE_MORTE],
    );

export const isHaut = (id) => isKeyBas(controls[id].keyboard[Control.HAUT])
    || isBouttonBas(id, controls[id].gamePad[Control.HAUT])
    || isAxePlusPetit(id,
        controls[id].gamePad[ManetteStick.VERTICAL_AXE_ID],
        -controls[id].gamePad[ManetteStick.ZONE_MORTE],
    );

export const isBas = (id) => isKeyBas(controls[id].keyboard[Control.BAS])
    || isBouttonBas(id, controls[id].gamePad[Control.BAS])
    || isAxePlusGrand(id,
        controls[id].gamePad[ManetteStick.VERTICAL_AXE_ID],
        controls[id].gamePad[ManetteStick.ZONE_MORTE],
    );

export const isAvant = (id, direction) => direction === FighterDirection.DROITE ? isDroite(id) : isGauche(id);
export const isArriere = (id, direction) => direction === FighterDirection.GAUCHE ? isGauche(id) : isDroite(id);

// export const isInactif = (id) => !(isDroite(id) || isGauche(id) || isHaut(id) || isBas(id));
export const isInactif = (id) => !(isGauche(id) || isDroite(id) || isHaut(id) || isBas(id));

export const isLegerCoup = (id) => isControlePressed(id, Control.LEGER_COUP);
export const isMoyenCoup = (id) => isControlePressed(id, Control.MOYEN_COUP);
export const isFortCoup = (id) => isControlePressed(id, Control.FORT_COUP);

export const isLegerKick = (id) => isControlePressed(id, Control.LEGER_KICK);
export const isMoyenKick = (id) => isControlePressed(id, Control.MOYEN_KICK);
export const isFortKick = (id) => isControlePressed(id, Control.FORT_KICK);
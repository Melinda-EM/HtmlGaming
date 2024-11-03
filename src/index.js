import { FightingGame } from './FightingGame.js';

window.addEventListener('load', function() {

    window.addEventListener('click', function() {

        new FightingGame().start();
        
    }, {once: true});

});


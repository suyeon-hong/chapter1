'use strict';
import Popup from './popup.js';
import Game from './Game.js';

const gameFinishBanner = new Popup();
const game = new Game(5, 5, 5);


game.setGameStopListener(reason => {
    let message;
    switch (reason){
        case 'cancel' :
            message = "REPLAY❓";
            break;
        case 'win' :
            message = "YOU WIN🎉";
            break;
        case 'lost' :
            message = "YOU LOST😥";
            break;
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => game.start());




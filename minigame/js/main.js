'use strict';
import Popup from './popup.js';
import GameBuilder from './Game.js';

const gameFinishBanner = new Popup();
const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

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




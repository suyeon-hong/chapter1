'use strict';
import Popup from './popup.js';
import { GameBuilder, Reason } from './Game.js';

const gameFinishBanner = new Popup();
const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

game.setGameStopListener(reason => {
    let message;
    switch (reason){
        case Reason.cancel :
            message = "REPLAY❓";
            break;
        case Reason.win:
            message = "YOU WIN🎉";
            break;
        case Reason.lost :
            message = "YOU LOST😥";
            break;
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => game.start());




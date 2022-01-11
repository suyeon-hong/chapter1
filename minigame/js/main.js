'use strict';
import Popup from './popup.js';
import * as sound from './sound.js';
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
            sound.playWin();
            break;
        case Reason.lost :
            message = "YOU LOST😥";
            sound.playAlert();
            break;
        default:
            throw new Error('not valid reason');
    }
    sound.stopBackground();
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => game.start());




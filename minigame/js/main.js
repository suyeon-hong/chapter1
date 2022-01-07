'use strict';
import Popup from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';
import Game from './Game.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score;

const gameFinishBanner = new Popup();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
const game = new Game();

gameFinishBanner.setClickListener(()=>{
    startGame();
});

gameField.setClickListener(onItemClick);

function onItemClick(item){
    if(!started) return;
    if(item === "carrot"){
        score++;
        updateScoreText(score);
        if(score == CARROT_COUNT){
            finishGame(true);
        }
    }else if(item === "bug"){
        finishGame(false)
    }
};

game.setClickListener(()=>{
    if(started){
        stopGame();
    }else{
        startGame();
    }
});


function stopGame(){
    started = false;
    gameFinishBanner.showWithText("REPLAY❓");
    sound.stopBackground();
    game.stop();
}

function startGame(){
    started = true;
    initGame();
    sound.playBackground();
    game.start();
}

function finishGame(win){
    started = false;
    if(win){
        sound.playWin();
    }else{
        sound.playAlert();
    }
    gameFinishBanner.showWithText(win ? "YOU WIN🎉" : "YOU LOST😥");
    sound.stopBackground();
    game.stop();
}

function initGame(){
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}


function updateScoreText(score){
    gameScore.innerText = CARROT_COUNT - score;
}

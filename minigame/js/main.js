'use strict';
import Popup from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let timer;
let score;

const gameFinishBanner = new Popup();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);

gameFinishBanner.setClickListener(()=>{
    gameBtn.style.visibility = "visible";
    startGame();
});

gameField.setClickListener(onItemClick);

function onItemClick(item){
    if(!started) return;
    if(item === "carrot"){
        e.target.remove();
        score++;
        updateScoreText(score);
        if(score == CARROT_COUNT){
            finishGame(true);
        }
    }else if(item === "bug"){
        finishGame(false)
    }
};


gameBtn.addEventListener("click", ()=>{
    if(started){
        stopGame();
    }else{
        startGame();
    }
});




function stopGame(){
    started = false;
    clearInterval(timer);
    hideGameButton();
    gameFinishBanner.showWithText("REPLAY❓");
    sound.stopBackground();
}

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
}

function finishGame(win){
    started = false;
    if(win){
        sound.playWin();
    }else{
        sound.playAlert();
    }
    clearInterval(timer);
    hideGameButton();
    gameFinishBanner.showWithText(win ? "YOU WIN🎉" : "YOU LOST😥");
    sound.stopBackground();
}

function showStopButton(){
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play")
}

function hideGameButton(){
    gameBtn.style.visibility = "hidden";
}

function showTimerAndScore(){
    gameTimer.style.visibility = "visible";
    gameScore.style.visibility = "visible";
}

function initGame(){
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}


function startGameTimer(){
    let remainTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainTimeSec);
    timer = setInterval(()=>{
        if(remainTimeSec <= 0){
            clearInterval(timer);
            finishGame(false);
            return;
        }
        updateTimerText(--remainTimeSec);
    }, 1000)
}

function updateTimerText(time){
    const min = Math.floor(time / 60);
    const sec = time % 60;
    gameTimer.innerText = `${min} : ${sec}`;
}

function updateScoreText(score){
    gameScore.innerText = CARROT_COUNT - score;
}

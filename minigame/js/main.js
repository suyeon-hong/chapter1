'use strict';
import Popup from './popup.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();

const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let timer;
let score;

const gameFinishBanner = new Popup();

gameFinishBanner.setClickListener(()=>{
    gameBtn.style.visibility = "visible";
    startGame();
})

gameField.addEventListener("click", e => onGameField(e))


gameBtn.addEventListener("click", ()=>{
    if(started){
        stopGame();
    }else{
        startGame();
    }
});

function onGameField(e){
    if(!started) return;
    if(e.target.matches(".carrot")){
        e.target.remove();
        playSound(carrotSound);
        score++;
        updateScoreText(score);
        if(score == CARROT_COUNT){
            finishGame(true);
        }
    }else if(e.target.matches(".bug")){
        playSound(bugSound);
        finishGame(false)
    }
}

function stopSound(sound){
    sound.pause();
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopGame(){
    started = false;
    clearInterval(timer);
    hideGameButton();
    gameFinishBanner.showWithText("REPLAY❓");
    stopSound(bgSound);
}

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function finishGame(win){
    started = false;
    if(win){
        playSound(winSound);
    }else{
        playSound(alertSound);
    }
    clearInterval(timer);
    hideGameButton();
    gameFinishBanner.showWithText(win ? "YOU WIN🎉" : "YOU LOST😥");
    stopSound(bgSound);
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
    gameField.innerHTML = "";
    gameScore.innerText = CARROT_COUNT;

    addItem("carrot", CARROT_COUNT, "img/carrot.png");
    addItem("bug", BUG_COUNT, "img/bug.png");
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for(let i = 0; i < count; i++){
        const item = document.createElement("img");
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.setAttribute("class", className);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        item.style.top = `${y}px`;
        item.style.left = `${x}px`;
        gameField.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
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

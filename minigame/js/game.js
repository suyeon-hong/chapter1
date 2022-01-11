'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export class Reason{
    cancel(){
        return 'cancel';
    }
    win(){
        return 'win';
    }
    lost(){
        return 'lost';
    }
}

export class GameBuilder{
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }
    withBugCount(num){
        this.bugCount = num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.started = false;
        this.score;
        this.timer;

        this.gameTimer = document.querySelector(".game__timer");
        this.gameScore = document.querySelector(".game__score");

        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.gameBtn = document.querySelector(".game__button");
        this.gameBtn.addEventListener("click", this.onClickBtn);

    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    onItemClick = (item) => {
        if(!this.started) return;

        if(item === "carrot"){
            this.score++;
            this.updateScoreText(this.score);
            if(this.score == this.carrotCount){
                this.finish(true);
            }
        }else if(item === "bug"){
            this.finish(false)
        }
    };

    onClickBtn = () => {
        if(this.started){
            this.stop();
        }else{
            this.start();
        }
    }

    start() {
        this.started = true;
        this.init();
        this.gameBtn.style.visibility = "visible";
        this._showStopButton();
        this._showTimerAndScore();
        this._startGameTimer();
        sound.playBackground();
    }

    stop(){
        this.started = false;
        this._hideGameButton();
        this.onGameStop && this.onGameStop(Reason.cancel);
        clearInterval(this.timer);
        sound.stopBackground();
    }

    finish(win){
        this.started = false;
        if(win){
            sound.playWin();
        }else{
            sound.playAlert();
        }
        this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lost);
        this._hideGameButton();
        clearInterval(this.timer);
        sound.stopBackground();
    }
    
    _showStopButton(){
        const icon = document.querySelector(".fas");
        icon.classList.add("fa-pause");
        icon.classList.remove("fa-play")
    }

    _hideGameButton(){
        this.gameBtn.style.visibility = "hidden";
    }

    _showTimerAndScore(){
        this.gameTimer.style.visibility = "visible";
        this.gameScore.style.visibility = "visible";
    }

    _startGameTimer(){
        let remainTimeSec = this.gameDuration;
        this._updateTimerText(remainTimeSec);
        this.timer = setInterval(()=>{
            if(remainTimeSec <= 0){
                clearInterval(this.timer);
                this.finish(false);
                return;
            }
            this._updateTimerText(--remainTimeSec);
        }, 1000)
    }
    _updateTimerText(time){
        const min = Math.floor(time / 60);
        const sec = time % 60;
        this.gameTimer.innerText = `${min} : ${sec}`;
    }

    init(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }
    
    updateScoreText(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}
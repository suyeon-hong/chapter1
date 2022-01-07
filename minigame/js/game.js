'use strict';
const GAME_DURATION_SEC = 5;
let timer;


export default class Game{
    constructor(){
        this.gameBtn = document.querySelector(".game__button");
        this.gameTimer = document.querySelector(".game__timer");
        this.gameScore = document.querySelector(".game__score");
        this.gameBtn.addEventListener("click", this.onClickBtn);
    }
    onClickBtn = ()=>{
        this.onClickBtn && this.onClickBtn();
    }
    setClickListener(onClickBtn){
        this.onClickBtn = onClickBtn;
    }

    start(){
        this.gameBtn.style.visibility = "visible";
        this._showStopButton();
        this._showTimerAndScore();
        this._startGameTimer();
    }

    stop(){
        this._hideGameButton();
        clearInterval(timer);
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
        let remainTimeSec = GAME_DURATION_SEC;
        this._updateTimerText(remainTimeSec);
        timer = setInterval(()=>{
            if(remainTimeSec <= 0){
                clearInterval(timer);
                finishGame(false);
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
}
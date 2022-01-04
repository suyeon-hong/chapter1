const body = document.querySelector("body");
const btnStart = document.querySelector(".btnStart");
const timer = document.querySelector(".timer");
const sec = timer.querySelector(".sec");
const ms = timer.querySelector(".ms");
const num = document.querySelector(".number");
const stage = document.querySelector(".stage");
const soundBg = document.querySelector(".sound_bg");
const soundCarrot = document.querySelector(".sound_carrot");
const soundBug = document.querySelector(".sound_bug");
const soundWin = document.querySelector(".sound_win");
let remainCarrot = 10;
let enableClick = true;
let timerSec;
let timerMs;

btnStart.addEventListener("click", ()=>{
    startGame();
});

function startGame(){
    btnStart.classList.add("on");
    soundBg.play();
    setTimer();
    countCarrot();
    displayImg();
    stage.addEventListener("click", e=>{
        if(enableClick){
            if(e.target.tagName !== "IMG") return;

            let target = e.target.getAttribute("alt");
            if(target == "carrot"){
                soundCarrot.play();
                e.target.remove();
                remainCarrot--;
                countCarrot();
                if(remainCarrot === 0){
                    gameover();
                    createPop("win");
                }
            }
            if(target == "bug"){
                soundBug.play();
                gameover();
                createPop("lost");
            }
        }
    })
}

function setTimer(){
    let millisec = 100;
    let seconds = 10;

    sec.innerText = seconds;
    ms.innerText = millisec;

    timerSec = setInterval(()=>{
        if(seconds == 0){
            gameover();
            sec.innerText = `00`;
            ms.innerText = `00`;
            return;
        }
        
        seconds--;
        sec.innerText = seconds;
    }, 1000)
    timerMs = setInterval(()=>{
        if(millisec == 0) millisec = 100;

        millisec--;
        ms.innerText = millisec;
    }, 10)
}

function countCarrot(){
    num.innerText = remainCarrot;
}

function displayImg(){
    stage.innerHTML = "";

    for(let i = remainCarrot; i>0; i--){
        let randomNum = Math.random()*1200;
        let randomNum2 = Math.random()*300;
        randomNum = parseInt(randomNum);
        randomNum2 = parseInt(randomNum2);

        stage.innerHTML += `
            <img src="img/carrot.png" alt="carrot" style="transform: translate(${randomNum}px, ${randomNum2}px)">
        `
    }
    for(let i = remainCarrot - 3; i>0; i--){
        let randomNum = Math.random()*1200;
        let randomNum2 = Math.random()*300;
        randomNum = parseInt(randomNum);
        randomNum2 = parseInt(randomNum2);

        stage.innerHTML += `
            <img src="img/bug.png" alt="bug" style="transform: translate(${randomNum}px, ${randomNum2}px)">
        `
    }
}

function gameover(){
    clearInterval(timerSec);
    clearInterval(timerMs);
    enableClick = false;
    soundBg.pause();
}

function createPop(text){
    const aside = document.createElement("aside");
    let tit;
    (text == "win") ? tit = "YOU WIN" : tit = "YOU LOST";

    aside.innerHTML = `
        <h1>${tit}</h1>
        <button class="btnRestart">
            <i class="fas fa-redo-alt"></i>
        </button>
    `;
    body.append(aside);
    aside.addEventListener("click", e=>{
        const target = e.target.closest("button");
        if(!target) return;

        aside.remove();
        restartGame();
    })
}

function restartGame(){
    remainCarrot = 10;
    enableClick = true;
    startGame();
}
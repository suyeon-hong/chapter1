const btnStart = document.querySelector(".btnStart");
const timer = document.querySelector(".timer");
const sec = timer.querySelector(".sec");
const ms = timer.querySelector(".ms");
const num = document.querySelector(".number");
const stage = document.querySelector(".stage");
let remainCarrot = 10;

btnStart.addEventListener("click", startGame);

function startGame(){
    setTimer();
    countCarrot();
    displayImg();
}

function setTimer(){
    let seconds = 5;
    let millisec = 100;
    sec.innerText = seconds;
    ms.innerText = millisec;

    const timer = setInterval(()=>{
        if(seconds == 0){
            clearInterval(timer);
            clearInterval(timer2);
            sec.innerText = `00`;
            ms.innerText = `00`;
            return;
        }
        
        seconds--;
        sec.innerText = seconds;
    }, 1000)
    const timer2 = setInterval(()=>{
        if(millisec == 0) millisec = 100;

        millisec--;
        ms.innerText = millisec;
    }, 10)
}

function countCarrot(){
    num.innerText = remainCarrot;
}

function displayImg(){
    for(let i = remainCarrot; i>0; i--){
        let randomNum = Math.random()*1200;
        let randomNum2 = Math.random()*300;
        randomNum = parseInt(randomNum);
        randomNum2 = parseInt(randomNum2);
        console.log(randomNum);

        stage.innerHTML += `
            <img src="img/carrot.png" alt="carrot" style="transform: translate(${randomNum}px, ${randomNum2}px)">
        `
    }
    for(let i = remainCarrot - 3; i>0; i--){
        let randomNum = Math.random()*1200;
        let randomNum2 = Math.random()*300;
        randomNum = parseInt(randomNum);
        randomNum2 = parseInt(randomNum2);
        console.log(randomNum);

        stage.innerHTML += `
            <img src="img/bug.png" alt="bug" style="transform: translate(${randomNum}px, ${randomNum2}px)">
        `
    }
}
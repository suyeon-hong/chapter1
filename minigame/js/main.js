const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup__message");
const refreshBtn = document.querySelector(".popup__refresh");

let started = false;
let timer;

refreshBtn.addEventListener("click", ()=>{
    gameBtn.style.visibility = "visible";
    started = true;
    startGame();
    hidePopup();
})

gameBtn.addEventListener("click", ()=>{
    if(started){
        stopGame();
    }else{
        startGame();
    }
    started = !started;
});

function stopGame(){
    showStartButton();
    clearInterval(timer);
    hideGameButton();
    showPopup("REPLAY❓");
}

function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function hidePopup(){
    popup.classList.add("popup__hide");
}

function showPopup(text){
    popupMessage.innertext = text;
    popup.classList.remove("popup__hide");
}

function showStartButton(){
    const icon = document.querySelector(".fa-pause");
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause")
}

function hideGameButton(){
    gameBtn.style.visibility = "hidden";
}

function showStopButton(){
    const icon = document.querySelector(".fa-play");
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play")
}

function showTimerAndScore(){
    gameTimer.style.visibility = "visible";
    gameScore.style.visibility = "visible";
}

function initGame(){
    field.innerHTML = "";
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
        field.appendChild(item);
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
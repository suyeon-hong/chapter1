const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();

const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup__message");
const refreshBtn = document.querySelector(".popup__refresh");

const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const windSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');

let started = false;
let timer;
let score;

gameField.addEventListener("click", e => onGameField(e))

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
});

function onGameField(e){
    if(!started) return;
    if(e.target.matches(".carrot")){
        e.target.remove();
        playSound(carrotSound);
        score++;
        updateScoreText(score);
        if(score == CARROT_COUNT){
            finishGame("YOU WIN!");
            playSound(windSound);
        }
    }else if(e.target.matches(".bug")){
        finishGame("YOU LOST!")
        playSound(bugSound);
        playSound(alertSound);
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
    showPopup("REPLAY❓");
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

function finishGame(text){
    started = false;
    clearInterval(timer);
    hideGameButton();
    showPopup(text);
    stopSound(bgSound);
}

function hidePopup(){
    popup.classList.add("popup__hide");
}

function showPopup(text){
    popupMessage.innerText = text;
    popup.classList.remove("popup__hide");
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
            finishGame("YOU LOST!");
            playSound(alertSound);
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

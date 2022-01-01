const btnStart = document.querySelector(".btnStart");
const timer = document.querySelector(".timer");
const sec = timer.querySelector(".sec");
const ms = timer.querySelector(".ms");

btnStart.addEventListener("click", ()=>{
    setTimer();

})

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
'use strict';

export default class Popup{
    constructor() {
        this.popup = document.querySelector(".popup");
        this.popupMessage = document.querySelector(".popup__message");
        this.refreshBtn = document.querySelector(".popup__refresh");
        this.refreshBtn.addEventListener("click", ()=>{
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick){
        this.onClick = onClick;
    }
    hide(){
        this.popup.classList.add("popup__hide");
    }
    showWithText(text){
        this.popupMessage.innerText = text;
        this.popup.classList.remove("popup__hide");
    }
}
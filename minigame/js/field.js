'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field{
    constructor(carrot, bug) {
        this.carrotCount = carrot;
        this.bugCount = bug;
        this.gameField = document.querySelector(".game__field");
        this.fieldRect = this.gameField.getBoundingClientRect();
        this.gameField.addEventListener("click", this.onClick)
    }
    init(){
        this.gameField.innerHTML = "";
        this._addItem("carrot", this.carrotCount, "img/carrot.png");
        this._addItem("bug", this.bugCount, "img/bug.png");
    }
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }
    onClick = (e) => {
        if(e.target.matches(".carrot")){
            e.target.remove();
            sound.playCarrot();
            this.onItemClick && this.onItemClick('carrot');
        }else if(e.target.matches(".bug")){
            sound.playBug();
            this.onItemClick && this.onItemClick('bug');
        }
    }
    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for(let i = 0; i < count; i++){
            const item = document.createElement("img");
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);

            item.setAttribute("class", className);
            item.setAttribute("src", imgPath);
            item.style.position = "absolute";
            item.style.top = `${y}px`;
            item.style.left = `${x}px`;
            this.gameField.appendChild(item);
        }
    }
}


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
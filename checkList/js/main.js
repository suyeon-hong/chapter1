const listBox = document.querySelector("ul");
const userInput = document.querySelector("#userInput");
const btnAdd = document.querySelector(".btnAdd");

btnAdd.addEventListener("click", ()=>{
    const value = userInput.value;
    userInput.value = "";

    if(!value) return;
    
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="checkbox"></span>
        <p class="list">${value}</p>
        <img src="img/icon_bin.png" class="btnDelete"></img>
    `;
    listBox.append(li);
});

listBox.addEventListener("click", e=>{
    const target = e.target.closest("li");

    if(target == null) return;

    const checkbox = target.querySelector(".checkbox");
    const list = target.querySelector(".list");
    const btnDelete = target.querySelector(".btnDelete");
    checkbox.addEventListener("click", ()=>{
        const isOn = checkbox.classList.contains("on");
        if(isOn){
            checkbox.classList.remove("on")
            list.classList.remove("on")
        }else{
            checkbox.classList.add("on")
            list.classList.add("on")
        }
    });
    btnDelete.addEventListener("click", ()=>{
        target.remove();
    });
});
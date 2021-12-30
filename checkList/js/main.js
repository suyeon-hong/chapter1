const items = document.querySelector(".items");
const form = document.querySelector(".new-form");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");
let i = 0;

form.addEventListener("submit", e=>{
    e.preventDefault();
    createList();
});

items.addEventListener("click", e=>{
    const id = e.target.dataset.id;
    if(id == null) return;

    const item = items.querySelector(`.item[data-id="${id}"]`);
    const checkbox = item.querySelector(".item__check");
    const list = item.querySelector(".item__name");
    const btnDelete = item.querySelector(".item__delete i");

    if(e.target === checkbox){
        checkbox.classList.toggle("on");
        list.classList.toggle("on");
    }

    if(e.target === btnDelete) item.remove();
});

function createList(){
    const value = input.value;
    input.value = "";
    input.focus();

    if(!value) return;
    
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-id", i);
    li.innerHTML = `
        <span class="item__check" data-id="${i}"></span>
        <p class="item__name" data-id="${i}">${value}</p>
        <button class="item__delete"><i class="fas fa-trash-alt" data-id="${i}"></i></button>
    `;
    i++;

    items.append(li);
    li.scrollIntoView({block: "end"});
}
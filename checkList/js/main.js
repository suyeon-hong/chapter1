const listBox = document.querySelector(".items");
const userInput = document.querySelector(".footer__input");
const btnAdd = document.querySelector(".footer__button");

// btnAdd버튼 클릭시 createList 함수 실행
btnAdd.addEventListener("click", createList);

// listBox내부에서 li클릭시 이벤트발생
listBox.addEventListener("click", e=>{
    const target = e.target.closest(".item");

    if(target == null) return;

    const checkbox = target.querySelector(".item__check");
    const list = target.querySelector(".item__name");
    const btnDelete = target.querySelector(".item__delete i");

    // checkbox클릭시 checkbox와 list에 클래스 on 추가
    if(e.target === checkbox){
        checkbox.classList.toggle("on");
        list.classList.toggle("on");
    }

    // btnDelete버튼 클릭시 해당 li삭제
    if(e.target === btnDelete) target.remove();
});

// 엔터키 누를시 createList함수 실행
window.addEventListener("keydown", e=>{
    if (e.key == "Enter") createList();
})

// input값 있을경우에만 list생성하는 함수
function createList(){
    const value = userInput.value;
    userInput.value = "";

    if(!value) return;
    
    const li = document.createElement("li");
    li.classList.add("item")
    li.innerHTML = `
        <span class="item__check"></span>
        <p class="item__name">${value}</p>
        <button class="item__delete">
            <i class="fas fa-trash-alt"></i>
        </buttonsrc=>
    `;
    listBox.append(li);
}
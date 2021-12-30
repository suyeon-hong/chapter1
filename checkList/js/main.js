const listBox = document.querySelector("ul");
const userInput = document.querySelector("#userInput");
const btnAdd = document.querySelector(".btnAdd");

// btnAdd버튼 클릭시 createList 함수 실행
btnAdd.addEventListener("click", createList);

// listBox내부에서 li클릭시 이벤트발생
listBox.addEventListener("click", e=>{
    const target = e.target.closest("li");

    if(target == null) return;

    const checkbox = target.querySelector(".checkbox");
    const list = target.querySelector(".list");
    const btnDelete = target.querySelector(".btnDelete");

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
    li.innerHTML = `
        <span class="checkbox"></span>
        <p class="list">${value}</p>
        <img src="img/icon_bin.png" class="btnDelete"></img>
    `;
    listBox.append(li);
}
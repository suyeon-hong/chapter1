const horizon = document.querySelector(".horizon");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

window.addEventListener("mousemove", e=>{
    horizon.style.top = `${e.clientY}px`;
    vertical.style.left = `${e.clientX}px`;
    target.style.top = `${e.clientY}px`;
    target.style.left = `${e.clientX}px`;
    tag.style.top = `${e.clientY}px`;
    tag.style.left = `${e.clientX}px`;
    tag.innerText = `${e.clientX}px, ${e.clientY}px`
})
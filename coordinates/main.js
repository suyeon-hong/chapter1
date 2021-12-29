const horizon = document.querySelector(".horizon");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

window.addEventListener("load", ()=>{
    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeigth = targetRect.height / 2;

    window.addEventListener("mousemove", e=>{
        const x = e.clientX;
        const y = e.clientY;
    
        horizon.style.transform = `translateY(${y}px)`;
        vertical.style.transform = `translateX(${x}px)`;
        target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeigth}px)`;
        tag.style.transform = `translate(${x}px, ${y}px)`;
    
        tag.innerText = `${e.clientX}px, ${e.clientY}px`
    })
})
const target = document.querySelector(".target");

window.addEventListener("mousemove", e=>{
    console.log(e.pageY, e.pageX)
    target.style.top = e.pageY + 'px';
    target.style.left = e.pageX + 'px';
    target.querySelector("p").innerText = `${e.pageY}px, ${e.pageX}px`;
})
const nav = document.querySelector("#nav");
const abrir= document.querySelector("#abrir");
const cerrar= document.querySelector("#cerrar");
const body = document.querySelector("body");

abrir.addEventListener("click", () => {
    nav.classList.add ("visible");
    body.classList.add("menu-abierto");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
    body.classList.remove("menu-abierto");
})
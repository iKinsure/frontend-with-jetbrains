

let firstWindow = () => document.getElementById("first").style.display = "block";
let secondWindow = () => document.getElementById("second").style.display = "block";

let firstClose = () => document.getElementById("first").style.display = "none";
let secondClose = () => document.getElementById("second").style.display = "none";

const hamburger = document.querySelector(".hamburger");
const navigator = document.querySelector(".navigator");

const handleClick = () => {
    hamburger.classList.toggle("hamburger-active");
    navigator.classList.toggle("navigator-active");
};
hamburger.addEventListener("click", handleClick);

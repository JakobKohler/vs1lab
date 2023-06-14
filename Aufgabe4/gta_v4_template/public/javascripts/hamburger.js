const hamburger = document.querySelector(".hamburger");
const navigation = document.querySelector(".header__navigation");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navigation.classList.toggle("active");
}
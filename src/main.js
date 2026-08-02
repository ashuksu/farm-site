import {initHomePage} from "./pages/homePage.js";
import {initCartModal} from "./components/cartModal.js";

const elements = {
    header: document.getElementById("header"),
    banner: document.getElementById("main-banner"),
    products: document.getElementById("products"),
    cart: document.getElementById("cart"),
    cartIcon: document.getElementById("cart-icon"),
    cartModal: document.getElementById("cart-modal"),
    cartContent: document.getElementById("cart-content"),
    cartItems: document.getElementById("cart-items"),
    cartTotal: document.getElementById("cart-total-modal"),
    total: document.getElementById("total"),
    confirmBlock: document.getElementById("confirm-actions"),
    closeCartBtn: document.getElementById("close-cart"),
    count: document.getElementById("count"),
    btnYes: document.getElementById("confirm-buy-btn-yes"),
    btnNo: document.getElementById("confirm-buy-btn-no"),
    buyBtn: document.getElementById("cart-btn-buy")
};

window.addEventListener("scroll", () => {
    elements.header.classList.toggle("scrolled", window.scrollY > 80);
});

initHomePage(elements);
initCartModal(elements);
import {initHomePage, updateCartUI} from "./pages/homePage.js";
import {getCart, clearCart} from "./store/cartStore.js";

const elements = {
    header: document.getElementById("header"),
    products: document.getElementById("products"),
    cart: document.getElementById("cart"),
    modal: document.getElementById("cart-modal"),
    cartItems: document.getElementById("cart-items"),
    cartTotal: document.getElementById("cart-total-modal"),
    total: document.getElementById("total"),
    count: document.getElementById("count"),
    buyBtn: document.getElementById("buy-btn"),
};

async function init() {
    bindEvents();
    await initHomePage(elements);
}

function bindEvents() {
    window.addEventListener("scroll", () => {
        elements.header.classList.toggle("scrolled", window.scrollY > 120);
    });

    elements.cart.addEventListener("click", openCart);

    elements.modal.addEventListener("click", (e) => {
        if (e.target === elements.modal) closeCart();
    });

    elements.buyBtn.addEventListener("click", handleBuy);
}

function openCart() {
    renderCart();
    elements.modal.classList.remove("hidden");
}

function closeCart() {
    elements.modal.classList.add("hidden");
}

function renderCart() {
    const cart = getCart();

    elements.cartItems.innerHTML = "";

    if (!cart.length) {
        elements.cartItems.innerHTML = "<p>The Cart is empty</p>";
        elements.cartTotal.innerText = "0 kr";
        return;
    }

    cart.forEach(item => {
        const el = document.createElement("div");
        el.className = "cart-item";

        el.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>${item.price * item.qty} kr</span>
        `;

        elements.cartItems.appendChild(el);
    });

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    elements.cartTotal.innerText = total + " kr";
}

function handleBuy() {
    const cart = getCart();

    if (!cart.length) {
        alert("The Cart is empty");
        return;
    }

    const text = cart
        .map(i => `${i.name} x${i.qty}`)
        .join(", ");

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    alert(`You ordered:\n${text}\n\nAmount: ${total} kr`);

    clearCart();
    updateCartUI(elements);
    closeCart();
}

init();
import {initHomePage, updateCartUI, refreshAll} from "./pages/homePage.js";
import {clearCart, getCart, updateQty, removeFromCart, getTotals} from "./store/cartStore.js";

const elements = {
    header: document.getElementById("header"),
    banner: document.getElementById("main-banner"),
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
    elements.modal.hidden = false;
}

function closeCart() {
    elements.modal.classList.add("hidden");
    elements.modal.hidden = true;
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
        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
            <div class="cart-row__visible" style="cursor: pointer; padding: 10px; border-bottom: 1px solid #eee;">
                <span>${item.name} x${item.qty}</span>
                <span style="float: right;">${item.price * item.qty} kr</span>
            </div>
            <div class="cart-row__details hidden" hidden style="padding: 10px; background: #f9f9f9; display: flex; gap: 10px; align-items: center;">
                <button class="btn-remove" style="background: none; border: 1px solid red; color: red;">X</button>
                <button class="btn-m">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="btn-p">+</button>
            </div>
        `;

        row.querySelector(".cart-row__visible").onclick = () => {
            row.querySelector(".cart-row__details").classList.toggle("hidden");
        };

        row.querySelector(".btn-m").onclick = () => {
            updateQty(item.id, -1);
            sync();
        };
        row.querySelector(".btn-p").onclick = () => {
            updateQty(item.id, 1);
            sync();
        };
        row.querySelector(".btn-remove").onclick = () => {
            removeFromCart(item.id);
            sync();
        };

        elements.cartItems.appendChild(row);
    });

    const {total} = getTotals();
    elements.cartTotal.innerText = total + " kr";
}

function sync() {
    renderCart();
    // updateCartUI(elements);
    refreshAll(elements);
    // Для полной синхронизации кнопок на главной можно вызвать initHomePage или использовать CustomEvents
}

function handleBuy() {
    const cart = getCart();
    if (!cart.length) return;

    // const text = cart
    //     .map(i => `${i.name} x${i.qty}`)
    //     .join(", ");
    //
    // const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    // alert(`You ordered:\n${text}\n\nAmount: ${total} kr`);

    const params = cart.map(i => `item=${i.id}&q=${i.qty}`).join('&');
    const deepLink = `myapp://checkout?${params}`;

    alert(`Deep Link:\n${deepLink}`);

    // clearCart();
    // sync();
    // closeCart();
}

init();
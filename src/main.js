import {initHomePage} from "./pages/homePage.js";
import {getCart, updateQty, removeFromCart, getTotals, clearCart} from "./store/cartStore.js";

const elements = {
    header: document.getElementById("header"),
    banner: document.getElementById("main-banner"),
    products: document.getElementById("products"),
    cart: document.getElementById("cart"),
    cartIcon: document.getElementById("cart-icon"),
    cartModal: document.getElementById("cart-modal"),
    cartContent: document.querySelector(".cart-content"),
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

const toggleCartModal = (show) => {
    elements.cartModal.classList.toggle("is-open", show);
    document.body.classList.toggle("modal-is-open", show);
    resetCheckoutState();
    if (show) renderCart();
};

const resetCheckoutState = () => {
    elements.cartContent.classList.remove("is-confirming");
    elements.buyBtn.disabled = false;
};

function renderCart() {
    const cart = getCart();
    elements.cartItems.innerHTML = cart.length ? "" : "<p>The Cart is empty</p>";

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML = `
            <div class="cart-row__visible">
                <span>${item.name} x${item.qty}</span>
                <span>${item.price * item.qty} kr</span>
            </div>
            <div class="cart-row__details hidden">
                <button class="button button--accent button--s btn-remove">✕</button>
                <button class="button button--secondary button--s btn-minus">-</button>
                <strong class="button button--transparent">${item.qty}</strong>
                <button class="button button--secondary button--s btn-plus">+</button>
            </div>
        `;

        const details = row.querySelector(".cart-row__details");

        row.querySelector(".cart-row__visible").onclick = () => details.classList.toggle("hidden");
        details.onclick = (e) => e.stopPropagation();
        row.querySelector(".btn-minus").onclick = () => updateQty(item.id, -1);
        row.querySelector(".btn-plus").onclick = () => updateQty(item.id, 1);
        row.querySelector(".btn-remove").onclick = () => removeFromCart(item.id);

        elements.cartItems.appendChild(row);
    });

    elements.cartTotal.innerText = `${getTotals().total} kr`;
}

document.getElementById("cart").onclick = () => toggleCartModal(true);

elements.closeCartBtn.onclick = () => toggleCartModal(false);

elements.cartModal.onclick = (e) => {
    if (e.target === elements.cartModal) toggleCartModal(false);
};

elements.buyBtn.onclick = () => {
    if (!getCart().length) return;
    elements.buyBtn.disabled = true;

    const link = `myapp://buy?${getCart().map(i => `id=${i.id}&q=${i.qty}`).join("&")}`;
    alert(link);
    elements.cartContent.classList.add("is-confirming");
};

elements.btnNo.onclick = resetCheckoutState;

elements.btnYes.onclick = () => {
    clearCart();
    toggleCartModal(false);
    alert("Purchase completed successfully!");
};

window.addEventListener("cartUpdated", () => {
    if (elements.cartModal.classList.contains("is-open")) {
        renderCart();
    }
});

window.addEventListener("scroll", () => elements.header.classList.toggle("scrolled", window.scrollY > 80));

initHomePage(elements);
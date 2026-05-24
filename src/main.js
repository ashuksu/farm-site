import {initHomePage} from "./pages/homePage.js";
import {getCart, updateQty, removeFromCart, getTotals, clearCart} from "./store/cartStore.js";
import {createCartRow, resetActiveCartRow} from "./components/cartRow.js";

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

const toggleCartModal = (show) => {
    elements.cartModal.classList.toggle("is-open", show);
    document.body.classList.toggle("modal-is-open", show);
    resetCheckoutState();

    if (show) {
        renderCart();
    } else {
        resetActiveCartRow();
    }
};

const resetCheckoutState = () => {
    elements.cartContent.classList.remove("is-confirming");
    elements.buyBtn.disabled = false;
};

function renderCart() {
    const cart = getCart();
    elements.cartItems.innerHTML = "";

    if (!cart.length) {
        elements.cartItems.innerHTML = "<p>The Cart is empty</p>";
    } else {
        cart.forEach(item => {
            elements.cartItems.appendChild(createCartRow(item));
        });
    }

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
    elements.cartTotal.innerText = `${getTotals().total} kr`;
});

window.addEventListener("scroll", () => elements.header.classList.toggle("scrolled", window.scrollY > 80));

initHomePage(elements);
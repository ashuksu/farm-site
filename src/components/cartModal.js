import {
    getCart,
    getTotals,
    updateQty,
    removeFromCart,
    clearCart
} from "../store/cartStore.js";

import {
    createCartRow,
    resetActiveCartRow
} from "./cartRow.js";

export function initCartModal(elements) {
    const resetCheckoutState = () => {
        elements.cartContent.classList.remove("is-confirming");
        elements.buyBtn.disabled = false;
    };

    const renderCart = () => {
        const cart = getCart();
        elements.cartItems.innerHTML = "";

        if (!cart.length) {
            elements.cartItems.innerHTML = "<p>The Cart is empty</p>";
        } else {
            cart.forEach(item => {
                elements.cartItems.appendChild(createCartRow(item));
            });
        }

        elements.cartTotal.innerText = `${Math.round(getTotals().total)} kr`;
    };

    const toggle = (show) => {
        elements.cartModal.classList.toggle("is-open", show);
        document.body.classList.toggle("modal-is-open", show);
        resetCheckoutState();

        if (show) {
            renderCart();
        } else {
            resetActiveCartRow();
        }
    };

    elements.cart.onclick = () => {
        if (!getCart().length) return;
        toggle(true);
    };

    elements.closeCartBtn.onclick = () => toggle(false);
    elements.cartModal.onclick = (e) => {

        if (e.target === elements.cartModal) {
            toggle(false);
        }
    };

    elements.buyBtn.onclick = () => {
        if (!getCart().length) return;
        elements.buyBtn.disabled = true;

        const link = `myapp://buy?${getCart()
            .map(i => `id=${i.id}&q=${i.qty}`)
            .join("&")}`;

        alert(link);
        elements.cartContent.classList.add("is-confirming");
    };

    elements.btnNo.onclick = resetCheckoutState;

    elements.btnYes.onclick = () => {
        clearCart();
        toggle(false);
        alert("Purchase completed successfully!");
    };

    window.addEventListener("cartUpdated", () => {
        if (elements.cartModal.classList.contains("is-open")) {
            renderCart();
        }
    });
}
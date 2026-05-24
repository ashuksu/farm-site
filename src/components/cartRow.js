import {getCart, updateQty, removeFromCart} from "../store/cartStore.js";

let activeRowId = null;

export function resetActiveCartRow() {
    activeRowId = null;
    window.dispatchEvent(new CustomEvent("cartRowChanged"));
}

export function createCartRow(item) {
    const row = document.createElement("div");
    row.className = "cart-row";

    const render = () => {

        const currentItem = getCart().find(i => i.id === item.id);

        if (!currentItem) {
            row.remove();
            return;
        }

        const editing = activeRowId === currentItem.id;

        row.innerHTML = `
            <div class="cart-row__visible">
                <span>${currentItem.name} x${currentItem.qty}</span>
                <span>${currentItem.price * currentItem.qty} kr</span>
            </div>
            <div class="cart-row__details ${editing ? "" : "hidden"}">
                <button class="button button--accent button--s btn-remove">✕</button>
                <button class="button button--secondary button--s btn-minus">-</button>
                <strong class="button button--transparent">${currentItem.qty}</strong>
                <button class="button button--secondary button--s btn-plus">+</button>
            </div>
        `;

        row.querySelector(".cart-row__visible").onclick = () => {

            activeRowId =
                activeRowId === currentItem.id
                    ? null
                    : currentItem.id;

            window.dispatchEvent(new CustomEvent("cartRowChanged"));
        };

        row.querySelector(".btn-minus").onclick = (e) => {
            e.stopPropagation();
            updateQty(currentItem.id, -1);
        };

        row.querySelector(".btn-plus").onclick = (e) => {
            e.stopPropagation();
            updateQty(currentItem.id, 1);
        };

        row.querySelector(".btn-remove").onclick = (e) => {
            e.stopPropagation();
            removeFromCart(currentItem.id);
        };
    };

    render();

    window.addEventListener("cartUpdated", render);
    window.addEventListener("cartRowChanged", render);

    return row;
}
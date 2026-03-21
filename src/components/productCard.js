import {getCart} from "../store/cartStore.js";

export function createProductCard(product, onAdd, onUpdate) {
    const el = document.createElement("div");
    el.className = "card";

    let isEditing = false;

    const render = () => {
        const cart = getCart();
        const itemInCart = cart.find(i => i.id === product.id);
        const qty = itemInCart ? itemInCart.qty : 0;

        if (qty === 0) isEditing = false;

        el.innerHTML = `
            <img
                class="image"
                src="${product.img}"
                loading="lazy"
                alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price} kr</div>
            <div class="card__actions" style="display: flex; gap: 5px; height: 40px;">
                ${!isEditing ? (
            qty === 0 ?
                `<button class="button btn-add" style="flex: 1; background: #28a745;">Add</button>` :
                `<button class="button btn-edit" style="width: 40px; border: 1px solid #ccc; background: #fff;">✏️</button>
                         <button class="button btn-added" style="flex: 1; background: red;">Added</button>`
        ) : (
            `<button class="button btn-minus" style="width: 40px;">-</button>
                     <div style="flex: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 1px solid #eee;">${qty}</div>
                     <button class="button btn-plus" style="width: 40px;">+</button>`
        )}
            </div>
        `;

        if (!isEditing) {
            if (qty === 0) {
                el.querySelector(".btn-add").onclick = () => onAdd(product, render);
            } else {
                el.querySelector(".btn-added").onclick = () => onAdd(product, render);
                el.querySelector(".btn-edit").onclick = (e) => {
                    e.stopPropagation();
                    isEditing = true;
                    render();
                };
            }
        } else {
            el.querySelector(".btn-minus").onclick = (e) => {
                e.stopPropagation();
                onUpdate(product.id, -1);
            };
            el.querySelector(".btn-plus").onclick = (e) => {
                e.stopPropagation();
                onUpdate(product.id, 1);
            };
        }
    };

    const handleOutsideClick = (e) => {
        if (isEditing && !el.contains(e.target)) {
            isEditing = false;
            render();
        }
    };

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("cartUpdated", render);

    render();
    return el;
}
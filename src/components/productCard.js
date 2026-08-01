import {getCart} from "../store/cartStore.js";

export function createProductCard(product, onAdd, onUpdate) {
    const el = document.createElement("div");
    el.className = "card";
    let isEditing = false;

    const render = () => {
        const item = getCart().find(i => i.id === product.id);
        const qty = item ? item.qty : 0;

        if (qty === 0) isEditing = false;

        el.innerHTML = `
            <img class="image" src="${product.img}" loading="lazy" alt="${product.name}">
            <div class="card__inner">
                <h3 class="title-card">${product.name}</h3>
                <div class="price">${product.price} kr</div>
                <div class="card__actions">
                    ${!isEditing ? `
                        ${qty === 0
                            ? `<button class="button button--primary button--add btn-add">Add</button>`
                            : `<button class="button button--transparent button--s btn-edit">✏️</button>
                                   <span class="button button--transparent button--s qty-badge">${qty}</span>
                                   <button class="button button--secondary btn-added">Added</button>`
                        }
                    ` : `
                        <button class="button button--secondary button--s btn-minus">-</button>
                        <div class="button button--transparent button--s qty-display">${qty}</div>
                        <button class="button button--secondary button--s btn-plus">+</button>
                    `}
                </div>
            </div>
        `;

        bindEvents(qty);
    };

    const bindEvents = (qty) => {
        if (!isEditing) {
            const addBtn = el.querySelector(".btn-add") || el.querySelector(".btn-added");
            if (addBtn) addBtn.onclick = () => onAdd(product);

            const editBtn = el.querySelector(".btn-edit");
            if (editBtn) editBtn.onclick = (e) => {
                e.stopPropagation();
                isEditing = true;
                render();
            };
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

    document.addEventListener("click", (e) => {
        if (isEditing && !el.contains(e.target)) {
            isEditing = false;
            render();
        }
    });

    window.addEventListener("cartUpdated", render);
    render();
    return el;
}
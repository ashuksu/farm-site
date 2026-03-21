export function createProductCard(product, onAdd) {
    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
        <img 
            class="image" 
            src="${product.img}" 
            loading="lazy" 
            alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">${product.price} kr</div>
        <button class="button">Добавить</button>
    `;

    el.querySelector("button").addEventListener("click", () => {
        onAdd(product);
    });

    return el;
}
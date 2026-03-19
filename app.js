const products = [
    {id: 1, name: "Помидоры", price: 120, img: "https://images.unsplash.com/photo-1561136594-7f68413baa99"},
    {id: 2, name: "Картофель", price: 60, img: "https://images.unsplash.com/photo-1698505949250-51f8b2c9c8c6"},
    {id: 3, name: "Молоко", price: 90, img: "https://images.unsplash.com/photo-1632200823229-376320621350"},
    {id: 4, name: "Яйца", price: 150, img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc"},
    {id: 5, name: "Мёд", price: 300, img: "https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf"},
    {id: 6, name: "Сыр", price: 250, img: "https://images.unsplash.com/photo-1559561853-08451507cbe7"}
];

let cart = [];

function renderProducts() {
    const container = document.getElementById("products");

    products.forEach(p => {
        const el = document.createElement("div");
        el.className = "card";

        el.innerHTML = `
      <img class="image" src="${p.img}" loading="lazy" alt="${p.name}">
      <h3>${p.name}</h3>
          <div class="price">${p.price} kr</div>
      <button class="button" onclick="addToCart(${p.id})">Добавить</button>
    `;

        container.appendChild(el);
    });
}

function addToCart(id) {
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, qty: 1});
    }

    updateCart();
}

function updateCart() {
    let total = 0;
    let count = 0;

    cart.forEach(i => {
        total += i.price * i.qty;
        count += i.qty;
    });

    document.getElementById("total").innerText = total + " ₽";
    document.getElementById("count").innerText = count + " товаров";
}

renderProducts();

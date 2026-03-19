// ====== DATA ======
const products = [
    {id: 1, name: "Помидоры", price: 120, img: "https://images.unsplash.com/photo-1561136594-7f68413baa99"},
    {id: 2, name: "Картофель", price: 60, img: "https://images.unsplash.com/photo-1698505949250-51f8b2c9c8c6"},
    {id: 3, name: "Молоко", price: 90, img: "https://images.unsplash.com/photo-1632200823229-376320621350"},
    {id: 4, name: "Яйца", price: 150, img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc"},
    {id: 5, name: "Мёд", price: 300, img: "https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf"},
    {id: 6, name: "Сыр", price: 250, img: "https://images.unsplash.com/photo-1559561853-08451507cbe7"}
];

let cart = [];

// ====== ELEMENTS ======
const elements = {
    products: document.getElementById("products"),
    cart: document.getElementById("cart"),
    modal: document.getElementById("cart-modal"),
    cartItems: document.getElementById("cart-items"),
    cartTotal: document.getElementById("cart-total-modal"),
    total: document.getElementById("total"),
    count: document.getElementById("count"),
    buyBtn: document.getElementById("buy-btn"),
};

// ====== INIT ======
function init() {
    renderProducts();
    bindEvents();
}

// ====== EVENTS ======
function bindEvents() {
    // открыть корзину
    elements.cart.addEventListener("click", openCart);

    // закрыть по фону
    elements.modal.addEventListener("click", (e) => {
        if (e.target === elements.modal) {
            closeCart();
        }
    });

    // купить
    elements.buyBtn.addEventListener("click", handleBuy);
}

// ====== PRODUCTS ======
function renderProducts() {
    elements.products.innerHTML = "";

    products.forEach(product => {
        const el = document.createElement("div");
        el.className = "card";

        el.innerHTML = `
            <img class="image" src="${product.img}" loading="lazy" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">${product.price} kr</div>
            <button class="button">Добавить</button>
        `;

        // кнопка
        const btn = el.querySelector("button");
        btn.addEventListener("click", () => addToCart(product.id));

        elements.products.appendChild(el);
    });
}

// ====== CART ======
function addToCart(id) {
    const existing = cart.find(i => i.id === id);

    if (existing) {
        existing.qty++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({...product, qty: 1});
    }

    updateCart();
}

function updateCart() {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    elements.total.innerText = total + " kr";
    elements.count.innerText = count + " товаров";
}

// ====== MODAL ======
function openCart() {
    renderCartModal();
    elements.modal.classList.remove("hidden");
}

function closeCart() {
    elements.modal.classList.add("hidden");
}

function renderCartModal() {
    elements.cartItems.innerHTML = "";

    if (cart.length === 0) {
        elements.cartItems.innerHTML = "<p>Корзина пуста</p>";
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

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    elements.cartTotal.innerText = total + " kr";
}

// ====== BUY ======
function handleBuy() {
    if (cart.length === 0) {
        alert("Корзина пуста");
        return;
    }

    const text = cart
        .map(i => `${i.name} x${i.qty}`)
        .join(", ");

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    alert(`Вы заказали:\n${text}\n\nСумма: ${total} kr`);

    cart = [];
    updateCart();
    closeCart();
}

// ====== START ======
init();
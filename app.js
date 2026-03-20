// ====== DATA ======
let products = [];
let cart = [];

const API_URL = "https://directus-production-d1db.up.railway.app";
const FALL_BACK_IMAGE = "/fallback.jpg";

// ====== ELEMENTS ======
const elements = {
    header: document.getElementById("header"),
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
async function init() {
    await loadProducts();
    renderProducts();
    bindEvents();
}

// ====== EVENTS ======
function bindEvents() {
    // скролл страницы
    window.addEventListener('scroll', () => {
        elements.header.classList.toggle('scrolled', window.scrollY > 120);
    });

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
            <img class="image"
                 src="${product.img}"
                 loading="lazy"
                 alt="${product.name}">
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

async function loadProducts() {
    try {
        const res = await fetch(`${API_URL}/items/products?filter[visible][_eq]=true`);

        if (!res.ok) {
            throw new Error("Ошибка запроса: " + res.status);
        }

        const json = await res.json();
        //console.log("DATA:", json);

        products = json.data
            .filter(p => p.visible === true || p.visible === 1)
            .map(p => ({
                id: p.id,
                name: p.title,
                price: Number(p.price.toFixed(2)),
                img: p.image
                    ? `${API_URL}/assets/${p.image}?width=400&format=webp`
                    : FALL_BACK_IMAGE
            }));

    } catch (err) {
        console.error("Ошибка загрузки товаров:", err);
    }
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
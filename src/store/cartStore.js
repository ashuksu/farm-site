let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

export function getCart() {
    return cart;
}

function save() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);
    existing ? existing.qty++ : cart.push({...product, qty: 1});
    save();
}

export function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);

    if (!item) return;

    item.qty += delta;
    save();

    if (item.qty <= 0) {
        removeFromCart(productId);
    }
}

export function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    save();
}

export function clearCart() {
    cart = [];
    save();
}

export function getTotals() {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = cart.length;

    return {total, count};
}
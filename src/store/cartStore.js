let cart = [];

export function getCart() {
    return cart;
}

export function addToCart(product) {
    const existing = cart.find(i => i.id === product.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
}

export function clearCart() {
    cart = [];
}

export function getTotals() {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    return { total, count };
}
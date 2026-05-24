const STORAGE_KEY = 'cart';
let cart = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];

const save = () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const getCart = () => cart;

export const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    existing ? existing.qty++ : cart.push({...product, qty: 1});
    save();
};

export const updateQty = (productId, delta) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return removeFromCart(productId);
    save();
};

export const removeFromCart = (productId) => {
    cart = cart.filter(i => i.id !== productId);
    save();
};

export const clearCart = () => {
    cart = [];
    save();
};

export const getTotals = () => ({
    total: Math.round(cart.reduce((sum, i) => sum + i.price * i.qty, 0)),
    count: cart.length
});
import {fetchProducts} from "../api/productsApi.js";
import {createProductCard} from "../components/productCard.js";
import {addToCart, getTotals} from "../store/cartStore.js";

export async function initHomePage(elements) {
    const products = await fetchProducts();

    elements.products.innerHTML = "";

    products.forEach(product => {
        const card = createProductCard(product, (p) => {
            addToCart(p);
            updateCartUI(elements);
        });

        elements.products.appendChild(card);
    });
}

export function updateCartUI(elements) {
    const {total, count} = getTotals();

    elements.total.innerText = total + " kr";
    elements.count.innerText = count + " products";
}
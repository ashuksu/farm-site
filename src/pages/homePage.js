import {fetchProducts} from "../api/productsApi.js";
import {createProductCard} from "../components/productCard.js";
import {addToCart, getTotals} from "../store/cartStore.js";
import {fetchBanners} from "../api/bannersApi.js";
import {renderBanner} from "../components/banner.js";

export async function initHomePage(elements) {
    const [banners, products] = await Promise.all([
        fetchBanners(),
        fetchProducts()
    ]);

    // banner
    if (banners && banners.length > 0) {
        renderBanner(elements.banner, banners[0]);
    } else {
        console.warn("Error: banner not found.");
    }

    // products
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
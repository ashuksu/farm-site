import {fetchProducts} from "../api/productsApi.js";
import {fetchBanners} from "../api/bannersApi.js";
import {createProductCard} from "../components/productCard.js";
import {renderBanner} from "../components/banner.js";
import {addToCart, updateQty, getTotals} from "../store/cartStore.js";

export async function initHomePage(elements) {
    const [banners, products] = await Promise.all([fetchBanners(), fetchProducts()]);

    if (banners?.length) renderBanner(elements.banner, banners[0]);

    elements.products.innerHTML = "";
    products.forEach(p => {
        elements.products.appendChild(createProductCard(p, addToCart, updateQty));
    });

    updateCartUI(elements);
    window.addEventListener("cartUpdated", () => updateCartUI(elements));
}

export function updateCartUI(elements) {
    const {total, count} = getTotals();
    elements.total.innerText = `${total} kr`;
    elements.count.innerText = `${count} product${count === 1 ? '' : 's'}`;
}
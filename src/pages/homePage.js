import {fetchProducts} from "../api/productsApi.js";
import {fetchBanners} from "../api/bannersApi.js";
import {createProductCard} from "../components/productCard.js";
import {renderBanner} from "../components/banner.js";
import {addToCart, updateQty, getTotals, getCart} from "../store/cartStore.js";

export async function initHomePage(elements) {
    const [banners, products] = await Promise.all([fetchBanners(), fetchProducts()]);

    if (banners?.length) renderBanner(elements.banner, banners[0]);

    elements.products.innerHTML = "";

    const safeProducts = products ?? [];
    safeProducts.forEach(p => {
        elements.products.appendChild(createProductCard(p, addToCart, updateQty));
    });

    updateCartUI(elements);
    window.addEventListener("cartUpdated", () => updateCartUI(elements));
}

export function updateCartUI(elements) {
    const {total, count} = getTotals();
    elements.total.innerHTML = total > 0 ? `${total} <span class="suffix">kr</span>` : '';
    elements.count.innerHTML = count > 0 ? `${count} <span class="suffix">pcs</span>` : '';
    elements.cartIcon.src = getCart().length > 0 ? "./assets/icons/cart-1.svg" : "./assets/icons/cart-0.svg";
    elements.cart.classList.toggle("is-disabled", getCart().length === 0);
}
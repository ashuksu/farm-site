import {fetchProducts} from "../api/productsApi.js";
import {createProductCard} from "../components/productCard.js";
import {addToCart, getTotals, updateQty} from "../store/cartStore.js";
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

    elements.products.innerHTML = "";

    products.forEach(product => {
        const card = createProductCard(
            product,
            (p, cb) => {
                addToCart(p);
                refreshAll(elements);
                cb();
            },
            (id, delta, cb) => {
                updateQty(id, delta);
                refreshAll(elements);
                cb();
            }
        );

        window.addEventListener("cartUpdated", () => {
            // не вызываем render() напрямую, можно добавить логику внутрь компонента
        });

        elements.products.appendChild(card);
    });

    updateCartUI(elements);
}

export function refreshAll(elements) {
    updateCartUI(elements);
    window.dispatchEvent(new CustomEvent("cartUpdated"));
}

export function updateCartUI(elements) {
    const {total, count} = getTotals();

    elements.total.innerText = total + " kr";
    elements.count.innerText = count + (count === 1 ? " product" : " products");
}
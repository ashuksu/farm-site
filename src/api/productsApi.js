import {API_URL, FALLBACK_IMAGE} from "../config.js";

export async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/items/products?filter[visible][_eq]=true`);

        if (!res.ok) {
            throw new Error("API error: " + res.status);
        }

        const json = await res.json();

        return json.data
            .filter(p => p.visible === true || p.visible === 1)
            .map(p => ({
                id: p.id,
                name: p.title,
                price: Number(p.price.toFixed(2)),
                img: p.image
                    ? `${API_URL}/assets/${p.image}?width=400&format=webp`
                    : FALLBACK_IMAGE
            }));
    } catch (err) {
        console.error("Error loading products:", err);
    }
}
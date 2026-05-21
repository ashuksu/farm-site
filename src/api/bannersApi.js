import {API_URL, FALLBACK_IMAGE} from "../config.js";
import { MOCK_BANNERS } from "./mockData.js";

export async function fetchBanners() {
    try {
        const res = await fetch(`${API_URL}/items/banners?filter[visible][_eq]=true&sort=order`);

        if (!res.ok) {
            console.error("Banner API error: " + res.status);
            // return null;
            return MOCK_BANNERS;
        }

        const json = await res.json();

        return json.data
            .map(b => ({
                id: b.id,
                order: b.order,
                title: b.title,
                text: b.text,
                button: b.button,
                url: b.url,
                image: b.image
                    ? `${API_URL}/assets/${b.image}?width=1280&format=webp`
                    : FALLBACK_IMAGE
            }));
    } catch (err) {
        console.error("Error loading banners:", err);
        return null;
    }
}
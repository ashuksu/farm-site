import {BASE_URL, FALLBACK_IMAGE} from "../config.js";

export function renderBanner(element, banner) {
    if (!element || !banner) return;

    const selectors = {
        bg: "[data-banner-bg-image]",
        title: "[data-banner-title]",
        text: "[data-banner-text]",
        btn: "[data-banner-button]"
    };

    const bgEl = element.querySelector(selectors.bg) || (element.hasAttribute("data-banner-bg-image") ? element : null);
    if (bgEl) bgEl.style.backgroundImage = `url('${banner.image || FALLBACK_IMAGE}')`;

    element.querySelector(selectors.title).textContent = banner.title || "";
    element.querySelector(selectors.text).textContent = banner.text || "";

    const btn = element.querySelector(selectors.btn);
    if (btn) {
        btn.textContent = banner.button || "";
        btn.href = banner.url ? (BASE_URL + banner.url) : "#";
    }
}
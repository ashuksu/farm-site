import {BASE_URL, FALLBACK_IMAGE} from "../config.js";

export function renderBanner(element, banner) {
    if (!element) return;

    const bgImageEl = element.querySelector("[data-banner-bg-image]") || (element.hasAttribute("data-banner-bg-image") ? element : null);
    if (bgImageEl) bgImageEl.style.backgroundImage = `url('${banner?.image || FALLBACK_IMAGE}')`;

    const titleEl = element.querySelector("[data-banner-title]");
    if (titleEl) titleEl.textContent = banner?.title ?? '';

    const textEl = element.querySelector("[data-banner-text]");
    if (textEl) textEl.textContent = banner?.text ?? '';

    const btnEl = element.querySelector("[data-banner-button]");
    if (btnEl) btnEl.textContent = banner?.button ?? '';

    const linkEl = element.querySelector("[data-banner-url]");
    if (linkEl) {
        const targetUrl = banner?.url ? (BASE_URL + banner.url) : '#';

        if (linkEl.tagName === 'A') {
            linkEl.href = targetUrl;
        } else {
            linkEl.onclick = () => window.location.href = targetUrl;
        }
    }
}
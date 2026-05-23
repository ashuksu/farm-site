export const API_URL = "https://directus-production-d1db.up.railway.app";

export const BASE_URL = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf('/') + 1
);

export const FALLBACK_IMAGE = BASE_URL + "assets/images/fallback.jpg";
import { StrapiResponse } from "../products";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export async function fetchAPI<T>(endpoint: string): Promise<StrapiResponse<T>> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Strapi API error:", res.statusText);
            throw new Error("Failed to fetch data from Strapi");
        }

        return await res.json();
    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
}

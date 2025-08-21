import { StrapiResponse } from "../products";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || '';

type FetchOptions = {
    cache?: RequestCache;
    revalidate?: number | false;
    tags?: string[];
};

export async function fetchAPI<T>(endpoint: string, options?: FetchOptions): Promise<StrapiResponse<T>> {
    try {
        if (!STRAPI_URL || STRAPI_URL.trim() === "") {
            throw new Error("Missing Strapi API URL");
        }

        const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
            headers: {
                Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : '',
            },
            cache: options?.cache || "no-cache", // Default to no cache
            next: {
                revalidate: options?.revalidate !== undefined ? options.revalidate : 60, // Default 60 seconds
                tags: options?.tags,
            }
        });

        if (!res.ok) {
            console.error("Strapi API error:", {
                status: res.status,
                statusText: res.statusText,
                url: res.url,
            });
            throw new Error(`Failed to fetch data from Strapi: ${res.status} ${res.statusText}`);
        }

        return await res.json() as StrapiResponse<T>;
    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
}

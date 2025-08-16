import { categories, colors, materials } from "./products";

export interface IFilters {
    categories: typeof categories[number][];
    colors: typeof colors[number][];
    materials: typeof materials[number][];
    priceRange: number[];
    inStock: boolean;
}
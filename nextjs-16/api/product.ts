import { cacheLife, cacheTag } from "next/cache";
import { clothingProducts, skinCareProducts } from "./data";

export const getProducts = async (type: string) => {
  // "use cache";
  // cacheLife("hours");

  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (type === "skin-care") {
    return getSkinCareProducts();
  }
  return clothingProducts;
};

export const getSkinCareProducts = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("skin-care-products");
  return skinCareProducts;
};

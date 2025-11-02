import axios from "axios";
import { cacheLife } from "next/cache";

export const getProducts = async () => {
  "use cache";
  cacheLife("hours");
  const response = await axios.get("https://fakestoreapi.com/products");
  console.log(response.data);
  return response.data;
};

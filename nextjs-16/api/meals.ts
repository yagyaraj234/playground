import axios from "axios";
import { cacheLife } from "next/cache";

export const getMeals = async (query: string) => {
  "use cache";
  cacheLife("hours");
  const response = await axios.get(
    `https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=${query}`
  );
  console.log(response.data);
  return response.data.data;
};

import axios from "axios";

export const getRandomQuote = async () => {
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/quotes/quote/random"
  );

  return response.data;
};

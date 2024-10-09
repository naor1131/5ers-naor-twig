import { useState, useEffect } from "react";
import { IStock } from "../types/types";
import axios from "axios";
import globalStore from "../store/global-store";

export const useStockService = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = async () => {
    // read from "cache".
    const cachedStockes = localStorage.getItem("stocks");
    if (cachedStockes) {
      setStocks(JSON.parse(cachedStockes));
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<IStock[]>(`${import.meta.env.VITE_SERVER_URL}/stocks`);
      localStorage.setItem("stocks", JSON.stringify(response.data)); // save to "cache".
      setStocks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(); // Fetch stocks when the service is first used
  }, []);

  const getLikedStocks = () => {
    return stocks.filter((stock) => globalStore.authenticatedUser?.liked_symbols?.includes(stock.symbol));
  };

  return { stocks, loading, fetchStocks, getLikedStocks };
};

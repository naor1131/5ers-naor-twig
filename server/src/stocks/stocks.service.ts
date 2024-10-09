import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface IStock {
  symbol: string;
  name: string;
  price: string;
  exchange: string;
  exchangeShortName: string;
}

@Injectable()
export class StocksService {
  async getStocks() {
    const response = await axios.get<IStock[]>(
      'https://financialmodelingprep.com/api/v3/stock/list',
      {
        params: {
          apikey: process.env.FMP_API_KEY,
          limit: 100,
        },
      },
    );

    return response.data.slice(0, 100);
  }

  async searchStocks(searchTerm: string) {
    const response = await axios.get<IStock[]>(
      'https://financialmodelingprep.com/api/v3/search',
      {
        params: {
          apikey: process.env.FMP_API_KEY,
          limit: 100,
          query: searchTerm,
        },
      },
    );
    return response.data.slice(0, 100);
  }
}

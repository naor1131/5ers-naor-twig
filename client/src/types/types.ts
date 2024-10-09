export interface IStock {
  symbol: string;
  name: string;
  price: string;
  exchange: string;
  exchangeShortName: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  liked_symbols?: string[];
}

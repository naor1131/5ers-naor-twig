import { useState } from "react";
import { HeartFilled, HeartOutlined, SearchOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import { observer } from "mobx-react";
import axios from "axios";
import { TableProps } from "antd/es/table";
import globalStore from "../../store/global-store";
import { IStock } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface IMarketPageProps {
  title: string;
  stocks?: IStock[];
}
const MarketPage = ({ stocks = [], title }: IMarketPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLikeButtonClick = async (symbol: string) => {
    const userLikedSymbols = globalStore.authenticatedUser?.liked_symbols;

    let newUserLikedSymbols = [];
    if (!userLikedSymbols) newUserLikedSymbols = [symbol];
    else if (userLikedSymbols.includes(symbol)) newUserLikedSymbols = userLikedSymbols.filter((sym) => sym !== symbol);
    else newUserLikedSymbols = [...userLikedSymbols, symbol];

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/${globalStore.authenticatedUser?._id}`, {
        liked_symbols: newUserLikedSymbols,
      });
      const updatedUser = response.data;
      globalStore.setAuthenticatedUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const columns: TableProps<IStock>["columns"] = [
    {
      title: "Actions",
      key: "actions",
      render: (_, stock) => {
        const isLiked = globalStore.authenticatedUser?.liked_symbols?.includes(stock.symbol);
        return (
          <Space size="middle">
            <a onClick={() => handleLikeButtonClick(stock.symbol)}>{isLiked ? <HeartFilled /> : <HeartOutlined />}</a>
            <a onClick={() => navigate(`/stock/${stock.symbol}`)}>
              <ZoomInOutlined />
            </a>
          </Space>
        );
      },
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Exchange",
      dataIndex: "exchange",
      key: "exchange",
    },
    {
      title: "exchange Short Name",
      dataIndex: "exchangeShortName",
      key: "exchangeShortName",
    },
  ];

  if (!stocks) return <div>loading...</div>;

  return (
    <div className="market-page">
      <h1>{title}</h1>
      <div style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <Input
          size="large"
          placeholder="search for any SYMBOL..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Table dataSource={stocks.filter((s) => s.symbol.toLowerCase().includes(searchTerm.toLowerCase()))} columns={columns} />;
      </div>
    </div>
  );
};

export default observer(MarketPage);

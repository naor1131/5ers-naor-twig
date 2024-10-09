import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { useStockService } from "../../services/stock";

const StockDetailsPage = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { stocks } = useStockService();
  const currentStock = stocks.find((stock) => stock.symbol === symbol);

  const stockJsx = (
    <div style={{ display: "flex", flexDirection: "column", width: 500, alignItems: "start", justifyContent: "center" }}>
      <h1 style={{ fontSize: 50, fontWeight: "bold", marginBottom: 0 }}>{currentStock?.symbol}</h1>
      <h3>{currentStock?.name}</h3>
      <h1 style={{ fontSize: 70 }}>{currentStock?.price}</h1>
    </div>
  );

  return (
    <div className="stock-details-page">
      <a onClick={() => navigate(-1)}>
        <LeftOutlined style={{ fontSize: 48 }} />
      </a>
      {currentStock ? stockJsx : <div>no data found.</div>}
    </div>
  );
};

export default StockDetailsPage;

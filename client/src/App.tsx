import { useEffect } from "react";
import Layout from "./components/layout/layout";
import { BrowserRouter } from "react-router-dom";
import globalStore from "./store/global-store";
import axios from "axios";
import { IUser } from "./types/types";
import { LoadingOutlined } from "@ant-design/icons";
import { useStockService } from "./services/stock";

import "./App.css";

function App() {
  const { loading } = useStockService();

  async function authenticate() {
    try {
      const response = await axios.get<IUser[]>(`${import.meta.env.VITE_SERVER_URL}/users`);
      const user = response.data[0];
      globalStore.setAuthenticatedUser(user);
    } catch (error) {
      console.error(`Authentication error`, error);
      throw error;
    }
  }

  // authenticate and fetch user
  useEffect(() => {
    authenticate();
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: "100vh",
          height: "100vh",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined style={{ fontSize: 40 }} />
        <div style={{ marginTop: 15 }}>Loading...</div>
      </div>
    );

  return (
    <div className="app">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;

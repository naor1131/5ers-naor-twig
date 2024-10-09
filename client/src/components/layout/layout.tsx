import { LogoutOutlined, UserOutlined, StockOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Layout as LayoutAntd, Menu, theme } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import StockDetailsPage from "../content/stock-details-page";
import { Routes, Route, useNavigate } from "react-router-dom";
import RouteNotExistPage from "../content/route-not-exist-page";
import { observer } from "mobx-react";
import globalStore from "../../store/global-store";
import { Footer } from "antd/es/layout/layout";
import MarketPage from "../content/market-page";
import { useStockService } from "../../services/stock";

const Layout = () => {
  const navigate = useNavigate();
  const { stocks } = useStockService();
  const { token } = theme.useToken();
  const { Content, Sider } = LayoutAntd;

  const menuItems: ItemType<MenuItemType>[] = [
    {
      key: "0",
      label: "Portfolio",
      icon: <UserOutlined />,
      onClick: () => {
        globalStore.setPageTitle("Portfolio");
        navigate("/user-portfolio");
      },
    },
    {
      key: "1",
      label: "Market",
      icon: <StockOutlined />,
      onClick: () => {
        globalStore.setPageTitle("Market");
        navigate("/market");
      },
    },
    { key: "2", type: "divider" },
    {
      key: "3",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => {
        globalStore.setPageTitle("Page Does Not Exist");
        navigate("/not-exist");
      },
    },
  ];

  return (
    <div
      className="layout"
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <LayoutAntd style={{ width: "100%", height: "100vh" }}>
        <Sider>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Menu
              theme="dark"
              selectedKeys={[globalStore.selectedMenuItemId]}
              mode="inline"
              items={menuItems}
              onClick={(info) => globalStore.setSelectedMenuItemId(info.key)}
            />
            <div>
              <div
                style={{ color: "white", marginBottom: 5, textAlign: "center" }}
              >{`Logged In As: ${globalStore.authenticatedUser?.username}.`}</div>
              <Button
                value={"Logout"}
                icon={<LogoutOutlined />}
                onClick={() => alert("Logout is disabled.")}
                style={{ width: "100%", backgroundColor: token.red8, border: 0, height: token.controlHeightLG }}
              />
            </div>
          </div>
        </Sider>
        <LayoutAntd>
          <Content style={{ margin: token.marginSM, marginBottom: 0 }}>
            <div
              style={{
                padding: token.paddingMD,
                background: token.colorBgContainer,
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowTertiary,
                minHeight: "100%",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <MarketPage
                      title={"Your Portfolio"}
                      stocks={stocks?.filter((s) => globalStore.authenticatedUser?.liked_symbols?.includes(s.symbol))}
                    />
                  }
                />
                <Route
                  path="/user-portfolio"
                  element={
                    <MarketPage
                      title={"Your Portfolio"}
                      stocks={stocks?.filter((s) => globalStore.authenticatedUser?.liked_symbols?.includes(s.symbol))}
                    />
                  }
                />
                <Route path="/market" element={<MarketPage title={"Market"} stocks={stocks} />} />
                <Route path="/stock/:symbol" element={<StockDetailsPage />} />
                <Route path="/*" element={<RouteNotExistPage />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", padding: token.paddingSM }}>
            Naor Twig ©{new Date().getFullYear()} | Created For 5ers
          </Footer>
        </LayoutAntd>
      </LayoutAntd>
    </div>
  );
};

export default observer(Layout);

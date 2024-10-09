import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import globalStore from "./store/global-store.ts";
import { Provider } from "mobx-react";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </StrictMode>
);

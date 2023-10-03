import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StoreProvider } from "./context/Store.provider.tsx";
import { AuthProvider } from "./context/Auth.provider.tsx";
import { InteractiveProvider } from "./context/Interactive.provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <InteractiveProvider>
      <AuthProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </AuthProvider>
    </InteractiveProvider>
  </React.StrictMode>
);

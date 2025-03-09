import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <BrowserRouter>
        <UserProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProviderWrapper>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for ReactDOM.createRoot
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { CartContextProvider } from "./store/cart-context";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <Router>
          <App />
        </Router>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

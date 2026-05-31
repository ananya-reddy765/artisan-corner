import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  CartProvider,
} from "./context/CartContext";

import {
  WishlistProvider,
} from "./context/WishlistContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <WishlistProvider>

          <CartProvider>

            <App />

          </CartProvider>

        </WishlistProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);
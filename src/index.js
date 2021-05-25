import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./contexts/cart-context";
import { FilterProvider } from "./contexts/filter-context";
import {AuthProvider} from "./contexts/auth-context"
import {BrowserRouter as Router} from "react-router-dom"


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <CartProvider>
        <FilterProvider>
        <AuthProvider>
        <Router>
          <App />
          </Router>
        </AuthProvider>
        </FilterProvider>
      </CartProvider>
  </StrictMode>,
  rootElement
);

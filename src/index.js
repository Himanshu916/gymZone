import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CategoryProvider } from "./contexts/category-context";
import { CartProvider } from "./contexts/cart-context";
import { makeServer } from "./api/server";
import { FilterProvider } from "./contexts/filter-context";

makeServer();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CategoryProvider>
      <CartProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </CartProvider>
    </CategoryProvider>
  </StrictMode>,
  rootElement
);

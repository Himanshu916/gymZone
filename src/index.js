import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./contexts/cart-context";
import { FilterProvider } from "./contexts/filter-context";
import {AuthProvider} from "./contexts/auth-context"
import {BrowserRouter as Router} from "react-router-dom"
import {DataProvider} from "./contexts/Global-State"


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DataProvider>
    <AuthProvider>
      <CartProvider>
        <FilterProvider>
        <Router>
       
       
          <App />
        
      
        </Router>
        </FilterProvider>
      </CartProvider>
      </AuthProvider>
      </DataProvider>
  </StrictMode>,
  rootElement
);

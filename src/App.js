import "./styles.css";
import "./mandik.css";
import {Routes,Route} from "react-router-dom";

import Header from "./components/Header/header";
import Products from "./components/MainPages/Products"
import Cart from "./components/cart";
import WishList from "./components/wishlist";
import Home from "./components/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/SignUp"
import NotFound from "./components/MainPages/NotFound"
import Productnew from "./components/MainPages/Productnew"




export default function App() {

  return (
    <div>
  
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/cart" element={<Cart />} />
        
        <Route path="/productsnew/:id" element={<Productnew/>} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

import "./styles.css";
import "./mandik.css";
import {Routes,Route} from "react-router-dom";

import Header from "./components/Header/header";
import Products from "./components/MainPages/Products"
import Sports from "./components/sports";
import Shoes from "./components/shoes";
import GymEssentials from "./components/gym";
import Supplements from "./components/supplements";
import FoodAndDrinks from "./components/foodanddrink";
import Cart from "./components/cart";
import WishList from "./components/wishlist";
import Home from "./components/Home";
import Product from "./components/Product";
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
        <Route path="/sports" element={<Sports />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/gym" element={ <GymEssentials />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/foodanddrink" element={<FoodAndDrinks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Product/>} />
        <Route path="/productsnew/:id" element={<Productnew/>} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

import "./styles.css";
import "./mandik.css";
import {Routes,Route} from "react-router-dom";

import Header from "./components/header";
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
import Login from "./components/Login"
import SignUp from "./components/SignUp"




export default function App() {

  return (
    <div>
  
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/sports" element={<Sports />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/gym" element={ <GymEssentials />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/foodanddrink" element={<FoodAndDrinks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Product/>} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
      </Routes>

    </div>
  );
}

import "./styles.css";
import "./mandik.css";
import { useContext } from "react";
import { categoryContext } from "./contexts/category-context";
import Header from "./components/header";
import Sports from "./components/sports";
import Shoes from "./components/shoes";
import GymEssentials from "./components/gym";
import Supplements from "./components/supplements";
import FoodAndDrinks from "./components/foodanddrink";
import Cart from "./components/cart";
import WishList from "./components/wishlist";

export default function App() {
  const { router } = useContext(categoryContext);
  return (
    <div>
      <Header />
      {router === "sports" && <Sports />}
      {router === "shoes" && <Shoes />}
      {router === "gym" && <GymEssentials />}
      {router === "supplements" && <Supplements />}
      {router === "foodanddrink" && <FoodAndDrinks />}
      {router === "cart" && <Cart />}
      {router === "wishlist" && <WishList />}
    </div>
  );
}

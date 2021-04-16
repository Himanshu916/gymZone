import { useContext } from "react";
import { categoryContext } from "../contexts/category-context";
export default function Header() {
  const { setRouter } = useContext(categoryContext);
  return (
    <div className="App">
      <div className="navigation">
        <ul className="navigation--list">
          <li onClick={() => setRouter("sports")}>Sports Wear</li>
          <li onClick={() => setRouter("shoes")}>Shoes</li>
          <li onClick={() => setRouter("gym")}>Gym Essentials</li>
          <li onClick={() => setRouter("supplements")}>Supplements</li>
          <li onClick={() => setRouter("foodanddrink")}>Food And Drink</li>
          <input
            placeholder="search for products"
            style={{ width: "40rem", marginRight: "2rem", padding: ".6rem" }}
            type="text"
          />
          <button onClick={() => setRouter("wishlist")} className="link-btn">
            WishList
          </button>
          <button onClick={() => setRouter("cart")} className="link-btn">
            Cart
          </button>
        </ul>
      </div>
    </div>
  );
}

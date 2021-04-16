import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart-context";
import PriceFilter from "../components/pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";

export default function GymEssentials() {
  const [gymEssentials, setgymEssentials] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get("./api/gymessentials");

      setgymEssentials([...gymEssentials, ...data.gymessentials]);
    })();
  }, []);
  const sortedData = getSortedData(gymEssentials, sortBy);
  return (
    <div>
      <h1>GymEssentials</h1>
      <PriceFilter />

      <div className="cards">
        {sortedData.map((gymessential) => {
          const price =
            gymessential.markedprice -
            (gymessential.discount / 100) * gymessential.markedprice;

          const index = itemsInCart.findIndex(
            (item) =>
              item.id === gymessential.id && item.text === gymessential.text
          );
          const indexwl = itemsInWishList.findIndex(
            (item) =>
              item.id === gymessential.id && item.text === gymessential.text
          );

          return (
            <div className="card">
              <img className="card__img" src={gymessential.imgsrc} alt="" />
              <div className="card__information">
                <h3 className="card__brand">Brand x</h3>
                <h4 className="card__description">{gymessential.text}</h4>
                <div className="card__price">
                  <span>Rs.{price} </span>
                  <span className="card__price-marked">
                    {gymessential.markedprice}
                  </span>
                  <span className="card__price-discount">
                    ( {gymessential.discount}% off)
                  </span>
                </div>
              </div>
              <div class="after">
                <div>
                  <button
                    className={
                      index === -1
                        ? "primary-btn btn--hover"
                        : "primary-btn-added btn--hover"
                    }
                    disabled={index === -1 ? false : true}
                    onClick={() => {
                      dispatch({
                        type: "AddToCart",
                        payload: gymessential
                      });
                    }}
                  >
                    Add to cart
                  </button>
                  <button
                    className="secondary-btn btn--hover"
                    style={
                      indexwl === -1 ? { display: "" } : { display: "none" }
                    }
                    onClick={() => {
                      dispatch({
                        type: "AddToWishList",
                        payload: gymessential
                      });
                    }}
                  >
                    Move To WishList
                  </button>
                  <button
                    className="secondary-btn btn--hover"
                    style={
                      indexwl !== -1 ? { display: "" } : { display: "none" }
                    }
                    onClick={() => {
                      dispatch({
                        type: "RemoveFromWishList",
                        payload: gymessential
                      });
                    }}
                  >
                    Remove From WishList
                  </button>
                  <div className="card__price">
                    <span>Rs.{price} </span>
                    <span className="card__price-marked">
                      {gymessential.markedprice}
                    </span>
                    <span className="card__price-discount">
                      ( {gymessential.discount}% off)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

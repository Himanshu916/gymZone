import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import PriceFilter from "./pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";

export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get("./api/supplements");

      setSupplements([...supplements, ...data.supplements]);
    })();
  }, []);
  const sortedData = getSortedData(supplements, sortBy);
  return (
    <div>
      <h1>SportsWear</h1>
      <PriceFilter />

      <div className="cards">
        {sortedData.map((supplement) => {
          const price =
            supplement.markedprice -
            (supplement.discount / 100) * supplement.markedprice;

          const index = itemsInCart.findIndex(
            (item) => item.id === supplement.id && item.text === supplement.text
          );
          const indexwl = itemsInWishList.findIndex(
            (item) => item.id === supplement.id && item.text === supplement.text
          );

          return (
            <div className="card">
              <img className="card__img" src={supplement.imgsrc} alt="" />
              <div className="card__information">
                <h3 className="card__brand">Brand x</h3>
                <h4 className="card__description">{supplement.text}</h4>
                <div className="card__price">
                  <span>Rs.{price} </span>
                  <span className="card__price-marked">
                    {supplement.markedprice}
                  </span>
                  <span className="card__price-discount">
                    ( {supplement.discount}% off)
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
                        payload: supplement
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
                        payload: supplement
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
                        payload: supplement
                      });
                    }}
                  >
                    Remove From WishList
                  </button>
                  <div className="card__price">
                    <span>Rs.{price} </span>
                    <span className="card__price-marked">
                      {supplement.markedprice}
                    </span>
                    <span className="card__price-discount">
                      ( {supplement.discount}% off)
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

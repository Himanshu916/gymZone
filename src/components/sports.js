import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import PriceFilter from "../components/pricefilter";
import { FilterContext } from "../contexts/filter-context";

export default function Sports() {
  const [clothes, setClothes] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("./api/sportswears");

      setClothes([...clothes, ...data.sportswears]);
    })();
  }, []);

  const sortedData = getSortedData(clothes, sortBy);

  return (
    <div>
      <h1>SportsWear</h1>
      <PriceFilter />

      <div className="cards">
        {sortedData.map((cloth) => {
          const price =
            cloth.markedprice - (cloth.discount / 100) * cloth.markedprice;

          const index = itemsInCart.findIndex(
            (item) => item.id === cloth.id && item.text === cloth.text
          );
          const indexwl = itemsInWishList.findIndex(
            (item) => item.id === cloth.id && item.text === cloth.text
          );

          return (
            <div className="card">
              <img className="card__img" src={cloth.imgsrc} alt="" />
              <div className="card__information">
                <h3 className="card__brand">Brand x</h3>
                <h4 className="card__description">{cloth.text}</h4>
                <div className="card__price">
                  <span>Rs.{price} </span>
                  <span className="card__price-marked">
                    {cloth.markedprice}
                  </span>
                  <span className="card__price-discount">
                    ( {cloth.discount}% off)
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
                        payload: cloth
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
                        payload: cloth
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
                        payload: cloth
                      });
                    }}
                  >
                    Remove From WishList
                  </button>
                  <div className="card__price">
                    <span>Rs.{price} </span>
                    <span className="card__price-marked">
                      {cloth.markedprice}
                    </span>
                    <span className="card__price-discount">
                      ( {cloth.discount}% off)
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

function reducer(state, action) {
  switch (action.type) {
    case "sort":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

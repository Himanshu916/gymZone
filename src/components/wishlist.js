import axios from "axios";
import { useContext,useEffect,useState } from "react";
import { CartContext } from "../contexts/cart-context";
import {Link} from "react-router-dom";

export default function WishList() {
  const { itemsInWishList, dispatch, itemsInCart } = useContext(CartContext);
  

useEffect(async()=>
{

  const {data}= await axios.get("https://infinite-tundra-39375.herokuapp.com/api/wishlist");
  dispatch({type:"setWishList",payload:data})
  // console.log(data)
  

},[])
  return (
    <>
      {(() => {
        if (itemsInWishList.length === 0) return <p>Nothing in wishList</p>;
        return (
          <div className="cards">
            {itemsInWishList.map((item) => {
              const price =
                item.markedprice - (item.discount / 100) * item.markedprice;
              const index = itemsInCart.findIndex(
                (itemInCart) =>
                  item.id === itemInCart.id && item.text === itemInCart.text
              );
              return (
                <div className="card"  key={item._id}>
                <Link to={`/products/${item._id}`}>
                  <img className="card__img" src={item.imgsrc} alt="" />
                  </Link>
                  <div className="card__information">
                    <h3 className="card__brand">Brand x</h3>
                    <h4 className="card__description">{item.text}</h4>
                    <div className="card__price">
                      <span>Rs.{price} </span>
                      <span className="card__price-marked">
                        {item.markedprice}
                      </span>
                      <span className="card__price-discount">
                        ( {item.discount}% off)
                      </span>
                    </div>
                  </div>

                  <button
                    className="secondary-btn btn--hover"
                    onClick={() => {
                      dispatch({ type: "RemoveFromWishList", payload: item });
                    }}
                  >
                    Remove
                  </button>
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
                        payload: item
                      });
                    }}
                  >
                    Move To Bag
                  </button>
                </div>
              );
            })}
          </div>
        );
      })()}
    </>
  );
}

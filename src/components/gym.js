import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart-context";
import {Link} from "react-router-dom";
import PriceFilter from "../components/pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";
import {getSearchedProducts} from "../someextrafunctionality.js/searchedProducts";
import SearchedText from "../components/SearchedText"
import "../filterDesign.css"
export default function GymEssentials() {
  const [gymEssentials, setgymEssentials] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
  const {saveSearch,dispatche} = useContext(FilterContext);

  useEffect(async ()=>{
    try{
      const {data}= await axios.get("http://localhost:5000/api/gymessentials");
      setgymEssentials([...gymEssentials, ...data]);
      console.log("from my backend",data,data[0]._id)
    }
  catch(error){
    console.log(error)
  }
  },[])

  useEffect(()=>
{
  return ()=>dispatche({type:"saveSearchText",payload:""})
},[])


  const sortedData = getSortedData(gymEssentials, sortBy);
  const searchedProducts = getSearchedProducts(sortedData,saveSearch);
  return (
    <div>
      <SearchedText text={saveSearch}/>
      <div className="filterDesign">
      <PriceFilter />

      <div className="cards filterDesign__right">
        {searchedProducts.map((gymessential) => {
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
            <Link to={`/products/${gymessential._id}`}>
              <img className="card__img" src={gymessential.imgsrc} alt="" />
              </Link>
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
    </div>
  );
}

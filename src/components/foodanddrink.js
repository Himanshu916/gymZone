import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import PriceFilter from "../components/pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";
import {Link} from "react-router-dom";
import {getSearchedProducts} from "../someextrafunctionality.js/searchedProducts";
import SearchedText from "../components/SearchedText"
import "../filterDesign.css"
export default function FoodAndDrinks() {
  const [FoodAndDrinks, setFoodAndDrinks] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
  const {saveSearch,dispatche} = useContext(FilterContext);
 

  useEffect(async ()=>{
    try{
      const {data}= await axios.get("https://infinite-tundra-39375.herokuapp.com/api/foodanddrinks");
      setFoodAndDrinks([...FoodAndDrinks, ...data]);
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

  const sortedData = getSortedData(FoodAndDrinks, sortBy);
  const searchedProducts = getSearchedProducts(sortedData,saveSearch);
  return (
    <div>
      <SearchedText text={saveSearch}/>
      <div className="filterDesign">
      <PriceFilter />

      <div className="cards filterDesign__right">
        {searchedProducts.map((foodanddrink) => {
          const price =
            foodanddrink.markedprice -
            (foodanddrink.discount / 100) * foodanddrink.markedprice;

          const index = itemsInCart.findIndex(
            (item) =>
              item.id === foodanddrink.id && item.text === foodanddrink.text
          );
          const indexwl = itemsInWishList.findIndex(
            (item) =>
              item.id === foodanddrink.id && item.text === foodanddrink.text
          );

          return (
            <div className="card">
            <Link to={`/products/${foodanddrink._id}`}>
              <img className="card__img" src={foodanddrink.imgsrc} alt="" />
              </Link>
              <div className="card__information">
                <h3 className="card__brand">Brand x</h3>
                <h4 className="card__description">{foodanddrink.text}</h4>
                <div className="card__price">
                  <span>Rs.{price} </span>
                  <span className="card__price-marked">
                    {foodanddrink.markedprice}
                  </span>
                  <span className="card__price-discount">
                    ( {foodanddrink.discount}% off)
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
                        payload: foodanddrink
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
                        payload: foodanddrink
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
                        payload: foodanddrink
                      });
                    }}
                  >
                    Remove From WishList
                  </button>
                  <div className="card__price">
                    <span>Rs.{price} </span>
                    <span className="card__price-marked">
                      {foodanddrink.markedprice}
                    </span>
                    <span className="card__price-discount">
                      ( {foodanddrink.discount}% off)
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

import axios from "axios";
import {Link} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import PriceFilter from "./pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";
import {getSearchedProducts} from "../someextrafunctionality.js/searchedProducts";
import SearchedText from "../components/SearchedText"
import "../filterDesign.css"
export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
  const {saveSearch,dispatche} = useContext(FilterContext);


  useEffect(async ()=>{
    try{
      const {data}= await axios.get("https://infinite-tundra-39375.herokuapp.com/api/supplements");
      setSupplements([...supplements, ...data]);
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
  const sortedData = getSortedData(supplements, sortBy);
  const searchedProducts = getSearchedProducts(sortedData,saveSearch);
  return (
    <div>
      <SearchedText text={saveSearch}/>
      <div className="filterDesign">
      <PriceFilter />

      <div className="cards filterDesign__right">
        {searchedProducts.map((supplement) => {
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
            <Link to={`/products/${supplement._id}`}>
              <img className="card__img" src={supplement.imgsrc} alt="" />
            </Link>
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
    </div>
  );
}

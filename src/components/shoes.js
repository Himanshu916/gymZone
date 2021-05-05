import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import axios from "axios";
import {Link} from "react-router-dom";
import PriceFilter from "./pricefilter";
import { getSortedData } from "../someextrafunctionality.js/sorted";
import { FilterContext } from "../contexts/filter-context";
import {getSearchedProducts} from "../someextrafunctionality.js/searchedProducts";
import SearchedText from "../components/SearchedText"
import "../filterDesign.css"
export default function Shoes() {
  const [shoes, setShoes] = useState([]);
  const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const { sortBy } = useContext(FilterContext);
 const {saveSearch,dispatche} = useContext(FilterContext);


  useEffect(async ()=>{
    try{
      const {data}= await axios.get("http://localhost:5000/api/shoesitems");
      setShoes([...shoes, ...data]);
  
    }
  catch(error){
    console.log(error)
  }
  },[])
  useEffect(()=>
{
  return ()=>dispatche({type:"saveSearchText",payload:""})
},[])
  const sortedData = getSortedData(shoes, sortBy);
  const searchedProducts = getSearchedProducts(sortedData,saveSearch);

  return (
    <div>
      
      <SearchedText text={saveSearch}/>
      <div className="filterDesign">
      <PriceFilter />

      <div className="cards filterDesign__right">
        {searchedProducts.map((cloth) => {
          const price =
            cloth.markedprice - (cloth.discount / 100) * cloth.markedprice;

          const index = itemsInCart.findIndex(
            (item) => item.id === cloth.id && item.text === cloth.text
          );
          const indexwl = itemsInWishList.findIndex(
            (item) => item.id === cloth.id && item.text === cloth.text
          );

          return (
            <div className="card" key={cloth._id}>
            <Link to={`/products/${cloth._id}`}>
              <img className="card__img" src={cloth.imgsrc} alt="" />
              </Link>
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
              <div className="after">
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
    </div>
  );
}

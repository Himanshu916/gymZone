import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect,useState,useContext} from "react";
import { CartContext } from "../contexts/cart-context";

export default function Product()
{
    const { dispatch, itemsInCart, itemsInWishList } = useContext(CartContext);
  const {id} = useParams();
  console.log(id);
    const [product,setProduct]=useState("");
    let x;
    useEffect(async()=>
    {
        const {data} = await axios.get("https://infinite-tundra-39375.herokuapp.com/api/products/"+id);

            setProduct(data);
          
    },[])
    const index = itemsInCart.findIndex(
        (item) => item._id === product._id
      );
      const indexwl = itemsInWishList.findIndex(
        (item) => item._id === product._id
      );
    const price =
    product.markedprice - (product.discount / 100) * product.markedprice;
  return(
      <>
    <div className="product">
        <div className="product__image">
            <img src={product.imgsrc} alt=""/>
        </div>
        <div className="product__description">
            <h1 className="product__name">
                {product.text}
            </h1>
            <div className="card__price product__price">
                  <span>Rs.{price} </span>
                  <span style={{fontSize:"2rem"}} className="card__price-marked">
                    {product.markedprice}
                  </span>
                  <span className="card__price-discount">
                    ( {product.discount}% off)
                  </span>
            </div>
      <div className="product__buttons">

      
        <button className={
                      index === -1
                        ? "primary-btn btn--hover"
                        : "primary-btn-added btn--hover"
                    }
                    disabled={index === -1 ? false : true}
                    onClick={() => {
                      dispatch({
                        type: "AddToCart",
                        payload: product
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
                        payload: product
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
                        payload: product
                      });
                    }}
                  >
                    Remove From WishList
                  </button>
                  </div>
                  </div>
        </div>
   
    </>
  )
}
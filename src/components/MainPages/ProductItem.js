import React,{useContext} from 'react'
import {Link} from "react-router-dom"
import {CartContext} from "../../contexts/cart-context";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';

export default function ProductItem({product}) {
const {itemsInCart,itemsInWishList,dispatch} = useContext(CartContext)

const index = itemsInCart?.findIndex(
  (item) =>
    item._id === product._id 
);
const indexwl = itemsInWishList?.findIndex(
  (item) =>
    item._id === product._id
);


    return (
        <div className= "productnew_card">
            <img src={product.images.url} alt="" />
            <div>
                <h2>
                    {product.title}
                </h2>
                <span>
                    {product.price}
                </span>
                <p>
                    {product.description}
                </p>
            </div>
            <div className ="productnew_button">
                <button
                    className={
                      index === -1
                        ? "primary-btn "
                        : "primary-btn-added "
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
                 
                <Link to={`/productsnew/${product._id}`}>  
                    <button className="view">
                     View
                    </button>
                </Link>
            </div>
            <div className="wishlist-button">
           {
            indexwl === -1 ? <FavoriteBorderIcon onClick={()=>dispatch({type:"AddToWishList",payload:product})} className="add"/> : <FavoriteIcon onClick={()=>dispatch({type:"RemoveFromWishList",payload:product})} className="remove"   />
           }
            </div>
  
                   
           
        </div>
    )
}

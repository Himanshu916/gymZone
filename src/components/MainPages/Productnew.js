import React,{useEffect,useContext,useState} from 'react'
import {GlobalState} from "../../contexts/Global-State"
import {useParams,Link} from "react-router-dom"
import ProductItem from "../../components/MainPages/ProductItem";
import { CartContext } from "../../contexts/cart-context"
import BtnRender from "../MainPages/utils/CartButton"
export default function Productnew() {
     const {state} = useContext(GlobalState)
     const {itemsInCart,itemsInWishList,dispatch} = useContext(CartContext)
     const [product,setProduct] = useState([])
     const [products] = state.products.products
     const {id} = useParams();

const index = itemsInCart?.findIndex(
  (item) =>
    item._id === id
);
const indexwl = itemsInWishList?.findIndex(
  (item) =>
    item._id === id
);

    

    useEffect(() => {
        products.forEach(product=>{
            if(product._id === id)
            {
                setProduct(product)

            }
        })

       
    }, [id,products]);
    console.log("product aa gaya",product)
    return (
      <>
            {
                product.length === 0 ? null :
                 <div className="productnew_detail">
                    <img src={product.images.url} alt="" />
                    <div className="productnew_detail_text">
                        <div className="productnew_detail_title">
                            <h2>{product.title}</h2>
                            <h6>{product.product_id}</h6>
                        </div>
                        <span>{product.price}</span>
                        <p> {product.description} </p>
                        <p> {product.content} </p>
                        <p> Sold :  {product.sold}</p>
                        <div className="productnew_detail_button">
                    
                            <button
                                 disabled={index === -1 ? false : true}
                                onClick={() => {
                                dispatch({
                                    type: "AddToCart",
                                    payload: product
                                });
                                }}
                              className="cart">
                                Add To Cart
                            </button>
                      
                       
                            <button disabled = {indexwl===-1 ? false : true}
                            onClick={()=>dispatch({type:"AddToWishList",payload:product})}
                             className="wishlist">
                                Move To WishList
                            </button>
                     
                        </div>
                      

                    </div>
                </div>
            }
            <div className="related_products_heading">
                <h2>
                    Related Products
                </h2>
            </div>
            <div className="related_products">
                {
                    products.map((one,index)=>{
                        if(one.categorie ===product.categorie)
                        {
                            return <ProductItem key={index} product={one}/>
                        }
                        
                        })
                }
            </div>
        </>
    )
}

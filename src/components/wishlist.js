
import { useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import ProductItem from "./MainPages/ProductItem"

export default function WishList() {
  const { itemsInWishList} = useContext(CartContext);
  console.log(itemsInWishList,"wishlist");
  return (
    <>
      {(() => {
        if (itemsInWishList?.length === 0) return <p>Nothing in wishList</p>;
      return <div className="productsnew">

        {
         itemsInWishList?.map(product=>{
         
                   
         return <ProductItem key={product.product_id} product={product}/>})

        }
      </div>       
      })()}
    </>
  );
}


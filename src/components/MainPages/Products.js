import React,{useContext} from 'react'
import { GlobalState} from "../../contexts/Global-State"
import ProductItem from "./ProductItem"
export default function Products() {
    const {state} = useContext(GlobalState)
    const [products] = state.products.products

console.log(products,"in products ")
    return (
        <div className = "productsnew">
           {products.map(product=>{
              return <ProductItem key={product.product_id} product={product} />})
               }
            
        </div>
    )
}

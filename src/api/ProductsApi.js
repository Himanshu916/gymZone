import React,{useState,useEffect} from 'react'
import axios from "axios"
export default function ProductsApi() {
    const [products,setProducts] = useState([]);
    const getProducts = async ()=>
    {
        const response =await axios.get("https://gymzonebackend.herokuapp.com/api/productsnew")
        console.log(response.data,"from backend")
        setProducts(response.data)
    }
useEffect(()=>
{
    getProducts();
},[])

    return {
        products:[products,setProducts]
    }
}
// evening-citadel-3599
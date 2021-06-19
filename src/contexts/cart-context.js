import { createContext, useReducer,useEffect } from "react";
import axios from "axios"
import {useAuth} from "./auth-context"
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {user,token} = useAuth()
 useEffect(()=>
 {
  (()=>
  {
    console.log(user,"in cart context")
    if(user.cartItems)
    dispatch({type:"setCart",payload:user.cartItems})
    if(user.wishList)
    console.log(user.wishList,"in cartwihlist")
    dispatch({type:"setWishList",payload:user.wishList})
  })()
 },[user])

   
  const [state, dispatch] = useReducer(cartReducer, {
    itemsInCart: [],
    itemsInWishList: [],token
  });
  console.log(user,state.itemsInCart,"kya hua")
 console.log(state.itemsInCart,"in auth h bhai")
  return (
    <>
      <CartContext.Provider
        value={{
          dispatch,
          itemsInWishList: state.itemsInWishList,
          itemsInCart: state.itemsInCart
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
 function cartReducer(state, action) {
  switch (action.type) {
    case "RemoveFromCart":
      console.log(action.payload);
      ( async ()=>
      {
        try{
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/removeFromCart",{cart:action.payload},{headers:{authorization:state.token}})
         
        }
        catch(err)
        {
          console.log(err) 
         
        }
      })()
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action.payload._id
        )
      };
    case "AddToCart":
      ( async ()=>
      {
      console.log(action.payload)
      
        try{
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/addCart",{cart:{...action.payload,quantity:1}},{headers:{authorization:state.token}})
         
        }
        catch(err)
        {
          console.log(err)
          
        }

      
      })()
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, { ...action.payload, quantity: 1 }]
      };

    case "AddToWishList":
     ( async ()=>
      {

        console.log(action.payload,"null ku h bhai");
        try{
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/addToWishList",{wishItem:action.payload},{headers:{authorization:state.token}})
         
        }
        catch(err)
        {
          console.log(err)
          
        }

      
      })()
  
      return {
        ...state,
        itemsInWishList: [...state.itemsInWishList, action.payload]
      };
   
    case  "setWishList" :
      return {...state,itemsInWishList:action.payload};

    case  "setCart" :
        return {...state,itemsInCart:action.payload}

    case "RemoveFromWishList":
    
      ( async ()=>
      {
        try{
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/removeFromWishList",{wishItem:action.payload},{headers:{authorization:state.token}})
         
        }
        catch(err)
        {
          console.log(err) 
         
        }
      })()
      return {
        ...state,
        itemsInWishList: state.itemsInWishList.filter(
          (item) => item._id !== action.payload._id
        )
      };

    case "Increase":
      (async ()=>
      {
        try
        {
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/updateQuantity",{type:"increase",id:action.payload._id},{headers:{authorization:state.token}})
        }
        catch(error)
        {
          console.log(error)
        }
      })()
      return {
        ...state.itemsInCart,
        itemsInCart: [
          ...state.itemsInCart.map((item) => {
            if (item._id === action.payload._id)
              return { ...item, quantity: item.quantity + 1 };
            return item;
          })
        ],
        itemsInWishList: state.itemsInWishList
      };

    case "Decrease":
      (async ()=>
      {
        try
        {
          await axios.patch("https://gymzonebackend.herokuapp.com/api/user/updateQuantity",{type:"decrease",id:action.payload._id},{headers:{authorization:state.token}})
        }
        catch(error)
        {
          console.log(error)
        }
      })()
      return {
        ...state.itemsInCart,
        itemsInCart: [
          ...state.itemsInCart.map((item) => {
            if (item._id === action.payload._id)
              return { ...item, quantity: item.quantity - 1 };
            return item;
          })
        ],
        itemsInWishList: state.itemsInWishList
      };

    default:
      return state;
  }
}


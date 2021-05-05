import { createContext, useReducer } from "react";
import axios from "axios"
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    itemsInCart: [],
    itemsInWishList: []
  });
 
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
          await axios.delete("http://localhost:5000/api/cart",{data:action.payload})
         
        }
        catch(err)
        {
          console.log(err) 
         
        }
      })()
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item.unique !== action.payload.unique
        )
      };
    case "AddToCart":
      ( async ()=>
      {
        try{
          await axios.post("http://localhost:5000/api/cart",{...action.payload,quantity:1})
         
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
        try{
          await axios.post("http://localhost:5000/api/wishlist",action.payload)
         
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
          await axios.delete("http://localhost:5000/api/wishlist",{data:action.payload})
         
        }
        catch(err)
        {
          console.log(err) 
         
        }
      })()
      return {
        ...state,
        itemsInWishList: state.itemsInWishList.filter(
          (item) => item.unique !== action.payload.unique
        )
      };

    case "Increase":
      return {
        ...state.itemsInCart,
        itemsInCart: [
          ...state.itemsInCart.map((item) => {
            if (item.unique === action.payload.unique)
              return { ...item, quantity: item.quantity + 1 };
            return item;
          })
        ],
        itemsInWishList: state.itemsInWishList
      };

    case "Decrease":
      return {
        ...state.itemsInCart,
        itemsInCart: [
          ...state.itemsInCart.map((item) => {
            if (item.unique === action.payload.unique)
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

// (async function () {
//   const { data } = await axios.post("./api/cartitems", {
//     cartitems: { item: action.payload }
//   });
//   console.log(data);
// })();

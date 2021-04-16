import { createContext, useReducer } from "react";

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

      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item.unique !== action.payload.unique
        )
      };
    case "AddToCart":
      return {
        ...state,
        itemsInCart: [...state.itemsInCart, { ...action.payload, quantity: 1 }]
      };

    case "AddToWishList":
      return {
        ...state,
        itemsInWishList: [...state.itemsInWishList, action.payload]
      };

    case "RemoveFromWishList":
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
            if (item.id === action.payload.id)
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
            if (item.id === action.payload.id)
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

import { useContext } from "react";
import { CartContext } from "../contexts/cart-context";

export default function Cart() {
  const { dispatch } = useContext(CartContext);
  const { itemsInCart } = useContext(CartContext);

  return (
    <>
      <div>
        {(() => {
          if (itemsInCart.length === 0) return <p>Nothing in cart</p>;
          return (
            <div>
              <h2>My Shopping Bag </h2>

              <ul className="stacked ">
                {itemsInCart.map((item) => {
                  let flag = 0;
                  const price =
                    (item.markedprice -
                      (item.discount / 100) * item.markedprice) *
                    item.quantity;

                  if (item.quantity === 0) {
                    flag = 1;
                  }
                  return (
                    <li>
                      <div className="shoppingBag">
                        <img src={item.imgsrc} alt="" />
                        <button
                          className="primary-btn"
                          onClick={() => {
                            console.log("clicked", item);
                            dispatch({ type: "RemoveFromCart", payload: item });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="shoppingBag--information">
                        <div>
                          <h3>Brand X</h3>
                          <div>
                            <p> {item.text}</p>
                            <p>Quantity : {item.quantity}</p>
                            <button
                              className="quantity-btn"
                              onClick={() => {
                                dispatch({ type: "Increase", payload: item });
                              }}
                            >
                              +
                            </button>
                            <button
                              className="quantity-btn"
                              disabled={flag === 0 ? false : true}
                              onClick={() =>
                                dispatch({ type: "Decrease", payload: item })
                              }
                            >
                              -
                            </button>
                          </div>
                        </div>

                        <div> Rs.{price}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
      </div>
    </>
  );
}

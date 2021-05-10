import { useContext,useState,useEffect } from "react";
import { CartContext } from "../contexts/cart-context";
import axios from "axios"
let discountAmount;
let totalMarked;
export default function Cart() {
  const { dispatch } = useContext(CartContext);
  const { itemsInCart } = useContext(CartContext);
  const [total,setTotal] = useState(0);
 


  useEffect(()=>
  {

    let totalAmount =0;
    discountAmount =0;
    totalMarked=0;
   
    itemsInCart.forEach(item=>
      {
        totalMarked += item.markedprice*item.quantity;
        totalAmount +=  (item.markedprice -
          (item.discount / 100) * item.markedprice) *
        item.quantity;
        discountAmount +=  ((item.discount / 100) * item.markedprice)*
        item.quantity
      })
      setTotal(totalAmount)
  },[itemsInCart])
  useEffect(async ()=>
  {
    const {data}= await axios.get("https://infinite-tundra-39375.herokuapp.com/api/cart");
    console.log(data)
    dispatch({type:"setCart",payload:data})
  },[])
  return (
    <>
      <div className="cartPage">
        <div className="cartPage__items">

        
        {(() => {
          if (itemsInCart.length === 0) return <p>Nothing in cart</p>;
          return (
            <div >
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

                        <div> Rs.{price} {item.markedprice}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
        </div>
        {

       itemsInCart.length !== 0 ? 
        <div className="cartPage__place">
            <div className="place__detail">
             <h2> PRICE DETAILS</h2>
            </div>
            <hr/>
            <div className="place__information">
              <ul className="place__information__list">
                <li >
                    <span>Price items</span>
                    <span> Rs {totalMarked} </span>
                </li>
                <li>
                  <span>Discount</span>
                  <span className="green_text">Rs {discountAmount} </span>
                </li>
                <li>
                    <span> Delivery charges</span>
                    <span className="green_text">Free</span>
                </li>
              </ul>
            </div>
            <div className="place__total">
               <h2>Total Amount</h2>
               <h4>{total}</h4>
            </div>
            <div >
            <h2 className="green_text discount_message">
            You will save {discountAmount} on this order
            </h2>
               
            <div className="orderButton">
              <button className="placeOrder">Place Order</button>
            </div> 
            </div>
          
        </div>
        :""
        }
      </div>
    </>
  );
}

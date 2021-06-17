import { useContext,useState,useEffect } from "react";
import { CartContext } from "../contexts/cart-context";
import {useAuth} from "../contexts/auth-context"
import axios from "axios"
import {useNavigate} from "react-router-dom"
let discountAmount;
let totalMarked;
export default function Cart() {
  const { itemsInCart,dispatch } = useContext(CartContext);
  const itemsInCartt = [];
  const [total,setTotal] = useState(0);
console.log(itemsInCart,"aditi")

  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>
{
 
if(!token)
{
 
  return navigate("/login")
}
    

},[token])
  useEffect(()=>
  {

    let totalAmount =0;
    discountAmount =0;
    totalMarked=0;
   
    itemsInCartt.forEach(item=>
      {
        totalMarked += item.markedprice*item.quantity;
        totalAmount +=  (item.markedprice -
          (item.discount / 100) * item.markedprice) *
        item.quantity;
        discountAmount +=  ((item.discount / 100) * item.markedprice)*
        item.quantity
      })
      setTotal(totalAmount)
  },[])

  console.log(itemsInCart,"in cat")
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
                
                  {/* const price =
                    (item.markedprice -
                      (item.discount / 100) * item.markedprice) *
                    item.quantity; */}

                  if (item.quantity === 0) {
                    flag = 1;
                  }
                  return (
                    <li key={item._id}>
                      <div className="shoppingBag">
                        <img src={item.images.url} alt="" />
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
                            {/* <p> {item.text}</p> */}
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

                        <div> Rs.{item.price} </div>
                        {/* <div> Rs.{price} {item.markedprice}</div> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
        </div>
        {/* {

       itemsInCartt.length !== 0 ? 
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
        } */}
      </div>
    </>
  );
}




// categorie: "Sports Wear"
// checked: false
// content: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam corrupti, quisquam maxime explicabo vero culpa eius velit maiores, adipisci aspernatur quod rerum repellendus placeat. Ullam veniam commodi nam iste odit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam corrupti, quisquam maxime explicabo vero culpa eius velit maiores, adipisci aspernatur quod rerum repellendus placeat. Ullam veniam commodi nam iste odit?"
// description: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam corrupti, quisquam maxime explicabo vero culpa eius velit maiores, adipisci aspernatur quod rerum repellendus placeat. Ullam veniam commodi nam iste odit?"
// images: {public_id: "test/h658zzjoipn2ounogcez", url: "https://res.cloudinary.com/himanshurana/image/upload/v1622568387/test/h658zzjoipn2ounogcez.jpg"}
// price: 900
// product_id: "sw02"
// quantity: 1
// sold: 0
// title: "red sports short"
// __v: 0
// _id: "60b66e47d9860327fca01bd8"
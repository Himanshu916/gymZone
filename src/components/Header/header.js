import {Link} from "react-router-dom";
import {useContext} from "react"
import {CartContext} from "../../contexts/cart-context"
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


import {useAuth} from "../../contexts/auth-context"


export default function Header() {

const {isUserLoggedIn,logout,admin} = useAuth()
const { itemsInCart,itemsInWishList } = useContext(CartContext);
function adminRouter() {
  return (
    <>
         <Link className="header__link" to="/createProducts">Create Product</Link>
         <Link className="header__link" to="/createCategories">Categories</Link>
    </>
  )
}
function getHistoryAndLogout()
{
  return (
    <>
      <Link className="header__link" to="/history">History</Link>
      <Link className="header__link" to="/" onClick={logout}>Logout</Link>

    </>

  )
}

return (
<div className="App">
<header className="header">
  <div className="header__left">
    <div className="menu">
      <MenuIcon/>
    </div>
    <div>
      <h2 className="logo">
      <Link className="header__link" to="/">
      { admin ? "Admin":"Gym Zone"}
      </Link>
     
      </h2>
    </div>
  </div>


  <div className="header__right">
    <ul className="right__leftchild">
        <li >
          
            <Link className="header__link" to="/products">
              {
                admin ? "Products" : "Shop"
              }
            </Link>
        </li>
        {
          admin && adminRouter()
        }
        <li >
        {
          isUserLoggedIn ? getHistoryAndLogout() : <Link className="header__link" to="login">Login or Register</Link>
        }
            
        </li>
    </ul>
    <ul className="right__rightchild">
        <li className="wishList" >
        <span className="wishList_quantity">{itemsInWishList?.length}</span>
          <Link className="header__link" to="wishlist">
            <FavoriteBorderIcon />
          </Link>
        </li>
        <li className="cart">
          <span className="cart_quantity">{itemsInCart?.length}</span>
          <Link className="header__link" to="cart">
            <ShoppingCartTwoToneIcon/>
          </Link>
           
        </li>
    </ul>
  </div>


</header>
   

</div>
  
  
  );
}

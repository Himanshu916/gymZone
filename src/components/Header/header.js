import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Navigation from "../navigation";

import {useAuth} from "../../contexts/auth-context"


export default function Header() {

const {isUserLoggedIn,logout,admin} = useAuth()

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
       { admin ? "Admin":"Gym Zone"}
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
        <li >
          <Link className="header__link" to="wishlist">
            <FavoriteBorderIcon />
          </Link>
        </li>
        <li className="cart">
          <span className="cart_quantity">0</span>
          <Link className="header__link" to="cart">
            <ShoppingCartTwoToneIcon/>
          </Link>
           
        </li>
    </ul>
  </div>


</header>
   
<Navigation/>
</div>
  
  
  );
}








// <form className="search-bar" action="">
// <div className="search-box">
//     <ArrowBackIcon onClick={(e)=>{
//       e.preventDefault();
//       dispatche({type:"saveSearchText",payload:""})}} style={{display:saveSearch===""?"none":""}} />
//     {/* <button   >clear</button> */}
//     <input value={searchText} onChange={(e)=>dispatche({type:"search",payload:e.target.value})} className="search-bar__input"
//         placeholder="search for products"
//         type="text" id="searchitems"
//       />
//       <label className="search-bar__label" htmlFor="searchitems"> <SearchIcon onClick={()=>dispatche({type:"saveSearchText",payload:searchText})} />
//       </label>
// </div>
// </form>
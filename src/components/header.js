
import {Link} from "react-router-dom";
import {useContext} from "react";
import {FilterContext} from "../contexts/filter-context";
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Navigation from "../components/navigation.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useAuth} from "../contexts/auth-context"


export default function Header() {
const {searchText,dispatche,saveSearch} = useContext(FilterContext);
const {isUserLoggedIn} = useAuth()

  return (
    <>
    <div className="App">
      <div className="logoandsearch">
            <div className="logoandsearch__left">
              <Link to="/">
                <HomeIcon style={{color:"black",fontSize:"3rem"}}/>
              </Link>
            </div>
            <form className="search-bar" action="">
                <div className="search-box">
                    <ArrowBackIcon onClick={(e)=>{
                      e.preventDefault();
                      dispatche({type:"saveSearchText",payload:""})}} style={{display:saveSearch===""?"none":""}} />
                    {/* <button   >clear</button> */}
                    <input value={searchText} onChange={(e)=>dispatche({type:"search",payload:e.target.value})} className="search-bar__input"
                        placeholder="search for products"
                        type="text" id="searchitems"
                      />
                      <label className="search-bar__label" htmlFor="searchitems"> <SearchIcon onClick={()=>dispatche({type:"saveSearchText",payload:searchText})} />
                      </label>
                </div>
            </form>
            <div className="user-wishlist-cart">
                      <div>
                      <span>
                        {isUserLoggedIn? <button>LOGOUT</button> : <Link to="/login"> <button>Login</button></Link> }
                      </span>
                      <AccountCircleIcon />
                      </div>
                
                <Link style={{textDecoration:"none",color:"black"}} to="wishlist">
                  <FavoriteBorderIcon />
                </Link>
                <Link style={{textDecoration:"none",color:"black"}} to="cart" > 
                  <ShoppingCartTwoToneIcon />
                </Link>
            </div>
        </div>
    </div>
    <Navigation/>
  
    </>
  );
}

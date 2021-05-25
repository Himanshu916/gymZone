import React,{useEffect,useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import {useLocation,useNavigate,Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';


const Login = () => {

    const {state} = useLocation();
    const [user,setUser] = useState({name:"",password:""})
    const navigate = useNavigate();
    const {isUserLoggedIn,loginWithCredentials}=useAuth();
    function clickHandler(e,{name,password})
    {
        e.preventDefault()
        console.log(e,user)
    
      if(!name && !password)
      {
          alert("please enter the details")
      }
      console.log("himanshu rajqs")
        loginWithCredentials(name,password)
    }
    function changeEmail(e)
    {
        setUser({...user,name:e.target.value})
    }

    function changePassword(e)
    {
        setUser({...user,password:e.target.value})
    }
    useEffect(()=>
    {
        
        if(isUserLoggedIn)
        navigate(state?.from ? state.from : "/")

    },[isUserLoggedIn])
    return (
      
          <div className="loginPage">
                <form onSubmit={(e)=>clickHandler(e,user)} className="loginForm">
                        <div className="loginMessage">
                            <h2>
                                Login
                            </h2>
                            <p>
                                Get access to your Orders, Wishlist and Recommendations
                            </p>
                        </div>
                        <TextField style={{color:"white"}} id="standard-basic" label="Email or Username" value={user.name} onChange={changeEmail} />
                        <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" onChange={changePassword} value={user.password} />
                        <p className="loginPrivacyMessage">
                        By continuing, you agree to gymTube's
                        <span>Terms of Use</span>  and <span>Privacy Policy.</span> 
                        </p>
                        <input type="submit" className="loginSubmit" value="Login" />
                        
                        <Link className="signUpMessage" to="/signup">
                            New to gymTube ? Create an account
                        </Link>
                            
                 
                </form>

          </div>
    );
};


export default Login;
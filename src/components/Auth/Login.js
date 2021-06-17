import React,{useEffect,useState} from 'react';
import {useAuth} from "../../contexts/auth-context";
import {useLocation,useNavigate,Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';


const Login = () => {

    
    const [user,setUser] = useState({email:"",password:""})
    // const navigate = useNavigate();
    const {isUserLoggedIn,loginWithCredentials,logout}=useAuth();
    function clickHandler(e,{email,password})
    {
        e.preventDefault()
       
    
      if(!email && !password)
      {
          alert("please enter the details")
      }
      
      isUserLoggedIn ? logout() : loginWithCredentials(email,password);

    }
    function changeHandler(e)
    {
        const name=e.target.name
        console.log(name)
        setUser({...user,[name]:e.target.value})
    }

   
    // useEffect(()=>
    // {
        
    //     if(isUserLoggedIn)
    //     navigate(state?.from ? state.from : "/")

    // },[isUserLoggedIn])
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
                        <TextField style={{color:"white"}} id="standard-basic" label="Email or Username" name="email" value={user.email} onChange={changeHandler} />
                        <TextField id="standard-password-input" label="Password" type="password" name="password" autoComplete="current-password" onChange={changeHandler} value={user.password} />
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
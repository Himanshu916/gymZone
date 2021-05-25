import React,{useEffect,useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import {useLocation,useNavigate,Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const SignUp = ()=>
{
  return (
    <div className="loginPage">
    <form action="" className="loginForm">
            <div className="loginMessage">
                <h2>
                    Sign Up
                </h2>
                <p>
                   Looks like you are new here ! Sign up with your email and get started
                </p>
            </div>
            <TextField style={{color:"white"}} id="standard-basic" label="Email or Username" />
            <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" />
            <p className="loginPrivacyMessage">
            By continuing, you agree to gymTube's
            <span>Terms of Use</span>  and <span>Privacy Policy.</span> 
            </p>
            <input type="submit" className="loginSubmit" value="Sign Up" />
            
            <Link className="signUpMessage" to="/login">
                Existing User ? Log in
            </Link>
                
     
    </form>

</div>
  )
}
export default SignUp
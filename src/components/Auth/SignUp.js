import React,{useEffect,useState} from 'react';
import {useAuth} from "../../contexts/auth-context";
import {useLocation,useNavigate,Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const SignUp = ()=>
{
  const [user,setUser] = useState({email:"",password:"",name:""})
  const {registerWithCredentials}=useAuth();
  function clickHandler(e,{email,password,name})
    {
        e.preventDefault()
       
    
      if(!email && !password && !name)
      {
          alert("please enter the details")
      }
      
      registerWithCredentials(email,password,name);
      setUser({email:"",password:"",name:""})

    }
    function changeEmail(e)
    {
        setUser({...user,email:e.target.value})
    }
    function changeName(e)
    {
        setUser({...user,name:e.target.value})
    }

    function changePassword(e)
    {
        setUser({...user,password:e.target.value})
    }

  return (
    <div className="loginPage">
    <form onSubmit={(e)=>clickHandler(e,user)} action="" className="loginForm">
            <div className="loginMessage">
                <h2>
                    Sign Up
                </h2>
                <p>
                   Looks like you are new here ! Sign up with your email and get started
                </p>
            </div>
            <TextField style={{color:"white"}} id="standard-basic-name" label="name" value={user.name} onChange={changeName}  />
            <TextField style={{color:"white"}} id="standard-basic" label="Email or Username" value={user.email} onChange={changeEmail}  />
            <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" value={user.password} onChange={changePassword} />
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
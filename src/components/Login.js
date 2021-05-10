import React from 'react';
import {useAuth} from "../contexts/auth-context";


const Login = () => {
    const {isUserLoggedIn,loginWithCredentials}=useAuth();
    function clickHandler()
    {
        loginWithCredentials("himanshu","rana")
    }
    return (
        <div>
            Login Page
            <button onClick={clickHandler}> {isUserLoggedIn ? "logout" : "login"} </button>
        </div>
    );
};


export default Login;
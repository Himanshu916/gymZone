import React from 'react';
import {Route,Navigate} from "react-router-dom";
import {useAuth} from "./contexts/auth-context"

const PrivateRoute = ({path,...props}) => {
    const {isUserLoggedIn} = useAuth();
    console.log(isUserLoggedIn,"hello")
    return (<>
       {isUserLoggedIn ? (<Route path={path} {...props} /> ) : (<Navigate state={{from:path}} replace to={"/login"}></Navigate>)}
       </>
    )
};


export default PrivateRoute;
import {createContext,useContext,useState,useContext} from "react";
import {fakeauthapi} from "../fakeAuthApi"
export const AuthContext = createContext();

const [isUserLoggedIn,setUserLoggedIn] = useState(false);

useEffect(() => {
    const  loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.isUserLoggedIn && setUserLoggedIn(true);
  }, []);
async function loginWithCredentials(userName,password)
{
    try{
        const response = await fakeauthapi(userName,password);
        if(response.success)
        {
            setUserLoggedIn(true);
            localStorage?.setItem("login",JSON.stringify({isUserLoggedIn:true}))
        }
    }
    catch(error)
    {
        console.log("password is wrong");
    }
}


export default function AuthProvider({children})
{
    return (
        <AuthContext.Provider value={{isUserLoggedIn,loginWithCredentials}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = ()=>
{
    return useContext(AuthContext);

}



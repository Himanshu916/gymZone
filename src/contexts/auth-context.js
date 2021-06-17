import {createContext,useContext,useState,useEffect} from "react";
import axios from "axios"
export const AuthContext = createContext();

export  function AuthProvider({children})
{
    
 
const {isUserLogIn,token:savedToken} = JSON.parse(localStorage?.getItem("login"))||{isUserLogIn:false,token:null};
console.log(JSON.parse(localStorage?.getItem("login")),"login h bhai")

const [isUserLoggedIn,setUserLoggedIn] = useState(isUserLogIn);
const [token,setToken] = useState(savedToken);
const [user,setUser] = useState({});

const [admin,setAdmin] = useState(false);



useEffect(()=>
{
    (async()=>
    {
        try{
            const {data}= await axios.get("https://gymzonebackend.herokuapp.com/api/user/infor",{headers:{authorization:token}});
            const user = data;
            console.log(user,"aaya ku nahi h")
            setUser(user)
          
            if(user.role===1)
            {
                setAdmin(true)
            }
            
        }
        catch(error)
        {
            console.log(error.response.data.message)
        }
    })()
},[token])


  function logout()
  {
      localStorage?.removeItem("login");
      setUserLoggedIn(false)
      setToken(null)
      setUser({})
      setAdmin(false)
   
  } 
async function loginWithCredentials(email,password)
{
    try{
        
        const response = await axios.post("https://gymzonebackend.herokuapp.com/api/user/login",{email,password})
        console.log(response,"huuu")
        if(response.status===200)
        {
            setUserLoggedIn(true);
           
            setToken(response.data.accesstoken)
           
            localStorage?.setItem("login",JSON.stringify({isUserLogIn:true,token:response.data.accesstoken}))
           
   
            console.log("what is happening",response)
        }

    }
    catch(error)
    {
        alert(error.response.data.message)
    }
  
}

async function registerWithCredentials(email,password,name)
{
    try{
        
        const response = await axios.post("https://gymzonebackend.herokuapp.com/api/user/register",{email,password,name})
        console.log(response,"huuu")
        if(response.status===200)
        {
            setUserLoggedIn(true);
           
            setToken(response.data.accesstoken)
            localStorage?.setItem("login",JSON.stringify({isUserLogIn:true,token:response.data.accesstoken}))
           
            //  
            console.log("what is happening",response)
        }

    }
    catch(error)
    {
        console.log(error.response)
        alert(error.response.data.message)
    }
  
}
console.log("is admin or not ",admin,user)

    return (
        <AuthContext.Provider value={{isUserLoggedIn,loginWithCredentials,registerWithCredentials,logout,token,admin,user}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = ()=>
{
    return useContext(AuthContext);

}



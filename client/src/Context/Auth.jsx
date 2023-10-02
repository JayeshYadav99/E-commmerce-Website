import { useEffect,createContext, useContext,useState } from "react";
import axios from "axios";
const AuthContext=createContext();

const AuthProvider=({children})=>{
    const[auth,SetAuth]=useState({
        user:null,
        token:''
    })

    const data = localStorage.getItem("auth");


axios.defaults.headers.common['Authorization']=auth?.token;
    useEffect(() => {
      if (data) {
        const parseData = JSON.parse(data);
        SetAuth({
          ...auth,
          user: parseData.user,
          token: parseData.token,
        });
      }
    }, [data])
    
    return (
        <AuthContext.Provider value={[auth,SetAuth]}>
{children}
        </AuthContext.Provider>
    )
}

const useAuth=()=>useContext(AuthContext);


export {useAuth,AuthProvider};
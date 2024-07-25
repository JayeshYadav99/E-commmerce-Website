import {useState,useEffect} from 'react'
import {useAuth} from  '../../Context/Auth'
import axios from 'axios'
import {Outlet} from "react-router-dom";
import Loader from "../Utility/Loader";
const AdminRoutes = () => {
    const[isAuthenticated,SetisAuthenticated]=useState(false);
    const[auth,SetAuth]=useAuth();

    useEffect(() => {
      console.log(auth)
      const check=async()=>{
        // const response =await axios(`${import.meta.env.VITE_API_URL}/api/v1/auth/admin-auth`,{
        //     headers:{
        //         "Authorization":`${auth.token}`
        //     }
        // });

        if(auth?.user.role){
            SetisAuthenticated(true);
        }
        else{
            SetisAuthenticated(false);
        }

      }

      if(auth?.token) check();
    }, [auth?.token])
    
  return  isAuthenticated ?  <Outlet/> :<Loader />
}

export default AdminRoutes;
import React from 'react'

import Imageslider from '../../Components/Utility/Imageslider'
import { useAuth } from '../../Context/Auth'
import HeroImage from "../../assets/7932291.gif"
import { FaShoppingCart, FaFilter, FaDollarSign, FaHeart } from 'react-icons/fa';
import Catalog from '../../Components/Product/Catalog';
import Features from '../../Components/Layout/Features';
import Hero from '../../Components/Layout/Hero';
import Layout from '../../Components/Layout/Layout'
export default function Homepage() {
  

  return (
    <Layout title={"Home"}>    
    
      <div>
<Hero/>
   
<Features/>
   <Catalog/>


  


    </div>
   </Layout>

  )
}

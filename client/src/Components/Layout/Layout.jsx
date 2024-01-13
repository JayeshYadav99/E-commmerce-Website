import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';

import Logo from '../../assets/online-shopping.png'
export default function Layout({children,title,description,author}) {
  return (
    <div>
        <Helmet>
   
  <meta charSet="UTF-8" />
  <meta name="description" content={description}/>
  <meta itemprop="name" content="Ecommerce Website"/>

  <meta itemprop="description" content=""/>

  <meta itemprop="image" content="../../assets/online-shopping.png"/>
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content={author} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>

        </Helmet>

        <Navbar/>
        <ToastContainer/>
        <main style={{minHeight:'80vh'}}>
        {children}</main>
       
        <Footer/>
    </div>
  )
}

Layout.defaultProps={
    title:"Ecommerce Website",
    description:"Mern stack webiste",
    keywords:"mern ,react,node,express,cart,React,Express",
    author:"Jayesh Yadav"
}
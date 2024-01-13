import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../../Components/Layout/Layout'
import { toast } from "react-toastify"
const Productdetails = () => {
const params=useParams()

const[product,Setproduct]=useState({})
const[similarproducts,Setsimilarproducts]=useState([])
const getProduct=async()=>{
    try {
        const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`)
    if(data.success){
        console.log(data.product.photo.url);
        Setproduct(data.product);
  
    }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong fetching Product");
    }
    
}
const getSimilarProduct=async()=>{
    try {
        console.log(product)
        const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-similar-product/${product._id}/${product.category._id}`)
    if(data.success){
        console.log(data);
        Setsimilarproducts(data.products);
    }
    } catch (error) {
        console.log(error);
        // toast.error("Something went wrong fetching similar product");
    }
    
}
useEffect(()=>{
    if(params?.slug)
    {
        getProduct()
      
    }
 
    
},[params.slug])
useEffect(()=>{
    getSimilarProduct();
},[product])
  return (
<div>
<Layout>
<section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4 md:w-1/2  ">
        { product && product.photo && product.photo.url &&       
         (
         <><div
         className="p-8 rounded-t-lg  bg-center h-96"
         style={{
           backgroundImage: `url(${product.photo.url})`,
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         //   backgroundSize: 'contain',
         }}
       >
         {/* You can add an overlay or loading spinner here if needed */}
       </div>
          <div className="flex-wrap hidden md:flex mt-4  ">
                   <div className="w-1/2  h-40 p-2 sm:w-1/4 ">
                   <div
         className="p-8 rounded-t-lg  border-red-600 border-4   bg-center h-48"
         style={{
           backgroundImage: `url(${product.photo.url})`,
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         //   backgroundSize: 'contain',
         }}
       >
         {/* You can add an overlay or loading spinner here if needed */}
       </div>
                   </div>
                   <div className="w-1/2  h-48 p-2 sm:w-1/4  border-red-600 border-4">
                   <div
         className="p-8 rounded-t-lg  bg-center h-96"
         style={{
           backgroundImage: `url(${product.photo.url})`,
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         //   backgroundSize: 'contain',
         }}
       >
         {/* You can add an overlay or loading spinner here if needed */}
       </div>
                   </div>
                   <div className="w-1/2  h-40 p-2 sm:w-1/4  border-red-600 border-4 h-48 ">
                   <div
         className="p-8 rounded-t-lg  bg-center h-96"
         style={{
           backgroundImage: `url(${product.photo.url})`,
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         //   backgroundSize: 'contain',
         }}
       >
         {/* You can add an overlay or loading spinner here if needed */}
       </div>
                   </div>
                   <div className="w-1/2  h-40 p-2 sm:w-1/4 ">
                   <div
         className="p-8 rounded-t-lg  bg-center h-96"
         style={{
           backgroundImage: `url(${product.photo.url})`,
           backgroundSize: 'contain',
           backgroundRepeat: 'no-repeat'
         //   backgroundSize: 'contain',
         }}
       >
         {/* You can add an overlay or loading spinner here if needed */}
       </div>
                   </div>
                 </div> 
            </>
  )}
   </div>
           
         
        <div className="w-full px-4 md:w-1/2 ">
          <div className="lg:pl-20">
            <div className="mb-8 ">
              <span className="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
              <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                {product?.name}</h2>
              <div className="flex items-center mb-6">
                <ul className="flex mr-2">
                  <li>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li> 
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                </ul>
                <p className="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
              </div>
              <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
             {product?.description}
              </p>
              <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                <span>{product?.price}</span>
                <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">$1500.99</span>
              </p>
              <p className="text-green-600 dark:text-green-300 ">7 in stock</p>
            </div>
            <div className="flex items-center mb-8">
              <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                Colors:</h2>
              <div className="flex flex-wrap -mx-2 -mb-2">
                <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                  <div className="w-6 h-6 bg-cyan-300" />
                </button>
                <button className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                  <div className="w-6 h-6 bg-green-300 " />
                </button>
                <button className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                  <div className="w-6 h-6 bg-red-200 " />
                </button>
              </div>
            </div>
            <div className="flex items-center mb-8">
              <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                Size:</h2>
              <div className="flex flex-wrap -mx-2 -mb-2">
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                </button>
                <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                </button>
              </div>
            </div>
            <div className="w-32 mb-8 ">
              <label htmlFor className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
              <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                  <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <input type="number" className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder={1} />
                <button className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center -mx-4 ">
              <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                  Add to Cart
                </button>
              </div>
              <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
<div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
    
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {similarproducts && similarproducts.map((product) => (
                     <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                     <a href="#">
                   <div
                     className="p-8 rounded-t-lg  bg-center h-48"
                     style={{
                       backgroundImage: `url(${product.photo.url})`,
                       backgroundSize: 'contain',
                       backgroundRepeat: 'no-repeat'
                     //   backgroundSize: 'contain',
                     }}
                   >
                     {/* You can add an overlay or loading spinner here if needed */}
                   </div>
                   </a>
                   <div className="px-5 pb-5">
                   <button onClick={()=>navigate(`/product/${product?.slug}`)}>
                     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                       {product?.name}
                     </h5>
                   </button>
                   <div className="flex items-center mt-2.5 mb-5">
                     {/* Add your content here */}
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-3xl font-bold text-gray-900 dark:text-white">
                       {product?.price}$
                     </span>
                     <a
                       href="#"
                       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                     >
                       Add to cart
                     </a>
                   </div>
                   </div>
                   </div>
                ))}
                </div>

</div>
</div>

</Layout>
 
</div>

  )
}

export default Productdetails
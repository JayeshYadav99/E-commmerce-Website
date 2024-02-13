import React from 'react'

import Imageslider from '../../Components/Utility/Imageslider'
import { useAuth } from '../../Context/Auth'
import HeroImage from "../../../public/7932291.gif"
import Layout from '../../Components/Layout/Layout'
export default function Homepage() {
  const[auth,SetAuth]=useAuth();

  return (
    <Layout title={"All Products - Best Offers"}>    
    
      <div>
      {/* Intro section*/}
<section className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Buying becomes Simplified and Sorted</h1>
      <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From selecting healthy items ,to caring about budget to payments ,all on us.</p>
      <a href="/ProductGallery" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        Buy Now
        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </a>
      <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
        Chat with us 
      </a> 
    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img src={HeroImage} alt="mockup" />
    </div>                
  </div>
</section>


{/* 
      <section className="bg-green-200 p-4 ">
        <h1 className="text-7xl mx-auto text-center mb-8">Products</h1>

        <Imageslider />
        <div className="grid grid-cols-2  md:grid-cols-3 gap-4 p-8">
          <div class="relative ">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
                 <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
                Oils and Nutrients</h3>
           
        </div>

          </div>



          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
               <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
              Watches</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
              alt=""
            />
               <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
              Shoes</h3>
           
        </div>
          </div>
          <div class="relative">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
              alt=""
            />
             <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
            SkinCare</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
              alt=""
            />
             <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
              Accessories</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
              alt=""
            />
             <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
              Lights and Lamps</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
              alt=""
            />
            <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
              Spices and Herbs</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
              alt=""
            />
             <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
            Games</h3>
           
        </div>
          </div>
          <div className='relative'>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
              alt=""
            />
              <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <h3 class="text-xl text-white font-bold mb-4">
            Bags</h3>
           
        </div>
          </div>
        </div>

      </section>
      <section className=' bg-red-200 p-4'>
        <div className="flex justify-center">
          <h2 className="mb-4 mr-2 text-7xl tracking-tight  text-gray-900 dark:text-white">Features</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-2 justify-center">
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent  text-underline bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Real-time Order Tracking</h1>
                <p className="mt-8 text-xl ">Stay updated on the status of your orders with real-time tracking. Know when your items are shipped, out for delivery, and delivered to your doorstep.</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h3 className=" pt-14 ml-4 text-lg font-extrabold text-gray-900 dark:text-white  md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h3>
                <img src="114-1145325_5-tracking-icon-courier-tracking-icon-clipart.png" width="200px" className="pt-8 ml-10  mr-0 relative right-0 bottom-0" />

              </div>

            </div>
          </div>
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Secure Payment Options</h1>
                <p className="mt-8 text-xl ">Enjoy peace of mind while shopping with our secure payment gateways, ensuring your sensitive information is protected throughout the transaction.</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h1 className=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h1>
                <img src="secure-payment.png" width="200px" className="pt-8  ml-10 mr-0 relative right-0 bottom-0" />

              </div>

            </div>
          </div>
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Personalized Recommendations</h1>
                <p className="mt-8 text-xl ">Experience tailored shopping with our smart algorithms that suggest products based on your preferences, making your browsing more relevant and enjoyable.</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h1 className=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h1>
                <img src="4376825.png" width="200px" className=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />


              </div>

            </div>
          </div>
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Effortless Navigation</h1>
                <p className="mt-8 text-xl ">Explore our vast collection effortlessly using intuitive search filters, categories, and sorting options, allowing you to find exactly what you're looking for without any hassle.</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h1 className=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h1>
                <img src="navigation.png" width="200px" className=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />

              </div>

            </div>
          </div>
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Easy Returns and Exchanges</h1>
                <p className="mt-8 text-xl ">We understand that sometimes things don't work out. Our hassle-free return and exchange policies ensure that you can shop with confidence, knowing that you have the flexibility to return or exchange items if needed</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h1 className=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h1>
                <img src="return.png" width="200px" className=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />

              </div>

            </div>
          </div>
          <div className="bg-blue-200  p-0 relative h-full ">
            <div>
              <div className='p-4' >
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Loyalty Programs and Rewards</h1>
                <p className="mt-8 text-xl "> Enjoy exclusive benefits through our loyalty programs. Earn points for every purchase and unlock special discounts, early access to sales, and other exciting rewards.</p>

              </div>
              <div className='grid grid-cols-2 mr-0 '>
                <h1 className=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span className="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
                </span> </h1>
                <img src="loyalty.png" width="200px" className=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />

              </div>

            </div>
          </div>


        </div>

      </section> */}
        {/* Product Gallery*/}
      {/* Features section*/}
    
    


 






    </div>
   </Layout>

  )
}

import React from 'react'
import Navbar from '../Components/Navbar'
import Imageslider from '../Components/Imageslider'
import Footer from '../Components/Footer'
export default function Homepage() {
  return (
    <>
{/* Intro section*/}
    <section >
        <div class="bg-red-400 max-w-screen dark:bg-gray-900 mb-0 ">
          <div class="grid max-w-screen-2xl px-2 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 ">
            <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-purple-900">  Unlock Limitless Shopping: Elevate Your Retail Experience with Exclusive Deals and Exciting Finds!
              </span> </h1>
            

          
              <a
                href="#"
                class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
              Start Shopping
                <svg
                  class="w-5 h-5 ml-2 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <div class="hidden  ml-8 lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="02june22_basket_icon_04-removebg-preview.png"
                alt="mockup"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features section*/}
      <section className=' bg-red-200 p-4'>
      <div class="flex justify-center">
  <h2 class="mb-4 mr-2 text-7xl tracking-tight  text-gray-900 dark:text-white">Features</h2>
</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-2 justify-center">
      <div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent  text-underline bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Real-time Order Tracking</h1>
      <p class="mt-8 text-xl ">Stay updated on the status of your orders with real-time tracking. Know when your items are shipped, out for delivery, and delivered to your doorstep.</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h3 class=" pt-14 ml-4 text-lg font-extrabold text-gray-900 dark:text-white  md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h3>
<img src="114-1145325_5-tracking-icon-courier-tracking-icon-clipart.png"  width="200px" class="pt-8 ml-10  mr-0 relative right-0 bottom-0" />
   
</div>
   
  </div>
</div>
<div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Secure Payment Options</h1>
      <p class="mt-8 text-xl ">Enjoy peace of mind while shopping with our secure payment gateways, ensuring your sensitive information is protected throughout the transaction.</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h1 class=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h1>
<img src="secure-payment.png"   width="200px" class="pt-8  ml-10 mr-0 relative right-0 bottom-0" />
   
</div>
   
  </div>
</div>
<div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Personalized Recommendations</h1>
      <p class="mt-8 text-xl ">Experience tailored shopping with our smart algorithms that suggest products based on your preferences, making your browsing more relevant and enjoyable.</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h1 class=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h1>
              <img src="4376825.png"  width="200px"class=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />
   
   
</div>
   
  </div>
</div>
<div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Effortless Navigation</h1>
      <p class="mt-8 text-xl ">Explore our vast collection effortlessly using intuitive search filters, categories, and sorting options, allowing you to find exactly what you're looking for without any hassle.</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h1 class=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h1>
<img src="navigation.png"   width="200px"class=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />
   
</div>
   
  </div>
</div>
<div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Easy Returns and Exchanges</h1>
      <p class="mt-8 text-xl ">We understand that sometimes things don't work out. Our hassle-free return and exchange policies ensure that you can shop with confidence, knowing that you have the flexibility to return or exchange items if needed</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h1 class=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h1>
<img src="return.png"  width="200px"class=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />
   
</div>
   
  </div>
</div>
<div class="bg-blue-200  p-0 relative h-full ">
  <div>
    <div class='p-4' >
      <h1 class="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-red-900">Loyalty Programs and Rewards</h1>
      <p class="mt-8 text-xl "> Enjoy exclusive benefits through our loyalty programs. Earn points for every purchase and unlock special discounts, early access to sales, and other exciting rewards.</p>
     
    </div>
<div class='grid grid-cols-2 mr-0 '>
<h1 class=" pt-14 ml-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl md:mt-8 lg:text-4xl"><span class="mt-8 text-transparent bg-clip-text bg-gradient-to-r to-violet-500 from-purple-900">  Learn More
              </span> </h1>
<img src="loyalty.png"   width="200px"class=" ml-10 pt-8  mr-0 relative right-0 bottom-0" />
   
</div>
   
  </div>
</div>


</div>

      </section>
       {/* Product Gallery*/}
       

    <section class="bg-green-200 p-4 ">
        <h1 class="text-7xl mx-auto text-center mb-8">Products</h1>
 
<Imageslider/>
    <div className="grid grid-cols-2  md:grid-cols-3 gap-4 p-8">
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
      alt=""
    />
  </div>
 

 
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
      alt=""
    />
  </div>
  <div>
    <img
      className="h-auto max-w-full rounded-lg"
      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
      alt=""
    />
  </div>
</div>

    </section>
 {/* Footer*/}
<Footer/>

 



    </>
  )
}

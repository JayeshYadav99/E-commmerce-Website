import React from 'react'

import HeroImage from "../../assets/7932291.gif"

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 max-h-xl ">
    <div className="grid max-w-screen-xl px-4 py-8 max-h-xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 border-black border-0">
      <div className="mr-auto  lg:col-span-7">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Buying becomes Simplified and Sorted</h1>
        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From selecting healthy items ,to caring about budget to payments ,all on us.</p>
        <a href="/ProductGallery" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
          Buy Now
          <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </a>
        {/* <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          Chat with us 
        </a>  */}
      </div>
      <div className="lg:col-span-3  mt-0 lg:flex">
        <img src={HeroImage} className="max-h-80 object-contain " alt="mockup" />
      </div>   
    </div>
  </section>
  )
}

export default Hero
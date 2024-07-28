import React from 'react'

import { FaShoppingCart, FaFilter, FaDollarSign, FaHeart } from 'react-icons/fa';
const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-100  mx-auto px-4 text-center">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FaFilter className="text-4xl text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Product Filters</h2>
        <p className="text-gray-600">Easily find what you're looking for with our intuitive filters and search functionality.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FaDollarSign className="text-4xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Budget-Friendly Carts</h2>
        <p className="text-gray-600"> Our budget-friendly carts feature is designed to optimize your cart</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Health-Conscious Suggestions</h2>
        <p className="text-gray-600">Receive personalized product recommendations based on your health goals.</p>
      </div>
    </div>
  </section>
  )
}

export default Features
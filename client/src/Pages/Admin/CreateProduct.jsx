import React, { useState, useEffect } from 'react'
import AdminMenu from "../../Components/AdminMenu";
import { NavLink, Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const CreateProduct = () => {
  const [categories, Setcategories] = useState([]);
  const [name, Setname] = useState('');
  const [price, Setprice] = useState('');
  const [quantity, Setquantity] = useState('');
  const [description, Setdescription] = useState('');
  const [category, Setcategory] = useState('');
  const [shipping, Setshipping] = useState('');
  const [imageFile, setImageFile] = useState(null);

const handleFileChange = (file) => {
  setImageFile(file);
};
  const getAllCategory = async () => {
    try {

      const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
      if (data.success) {
        console.log(data.category[0].name);
        Setcategories(data.category);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching categories");
    }
  }

const handleOnSubmit=async(e)=>{
  e.preventDefault();
  try {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('shipping', shipping);
    formData.append('photo', imageFile);
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/create-product-cloud`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      }});
      if (response.data.success) {
        toast.success("Product created successfully");
        // Optionally, you can reset the form fields and image here
        Setname('');
        Setprice('');
        Setquantity('');
        Setdescription('');
        Setcategory('');
        Setshipping('');
        setImageFile(null);
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }

}

  useEffect(() => {

    getAllCategory();
  }, [])
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="flex">
        {/* AdminMenu */}
        <AdminMenu />

        {/* AdminDashboard */}
        <div className="flex-1 p-12">

          <h3 className="text-base font-semibold leading-7 mb-4 text-gray-900">Product</h3>

          <form onSubmit={handleOnSubmit} encType="multipart/form-data">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" 
                value={name}
                onChange={(e)=>Setname(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
              </div>
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                <input type="number" name="quantity" id="quantity"
                       value={quantity}
                       onChange={(e)=>Setquantity(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product quantity" required />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price" id="price"
                       value={price}
                       onChange={(e)=>Setprice(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
              </div>
              <div>
                <label htmlFor="shipping" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping</label>
                <input type="number" name="shipping" id="shipping"
                       value={shipping}
                       onChange={(e)=>Setshipping(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select id="category"
                value={category}
                onChange={(e)=>Setcategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option selected>Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}


                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea id="description" 
                value={description}
                onChange={(e)=>Setdescription(e.target.value)}
                rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write product description here" defaultValue={""} />
              </div>


              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                <div class="flex items-center justify-center w-full">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
        id="dropzone-file"
        type="file"
        className="unhidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
                  </label>
                </div>
              </div>



            </div>
            <button type="submit" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
              Add new product
            </button>
          </form>


          {/* Rest of your AdminDashboard content */}
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
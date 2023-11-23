import React, { useState, useEffect } from 'react'
import AdminMenu from "../../Components/AdminMenu";
import { NavLink, Link ,useParams,useNavigate} from 'react-router-dom'
import Layout from '../../Components/Layout'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const UpdateProduct = () => {
    const navigate=useNavigate();
    const params=useParams();
  const [categories, Setcategories] = useState([]);
  const[Product,Setproduct]=useState();
  const [name, Setname] = useState('');
  const [price, Setprice] = useState('');
  const [quantity, Setquantity] = useState('');
  const [description, Setdescription] = useState('');
  const [category, Setcategory] = useState('');
  const [shipping, Setshipping] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);




  const handleDelete = () => {
 
    setShowModal(true);
  };


  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/product/product/${Product._id}`);

      if (response.data.success) {
        toast.success('Product Deleted successfully');
        navigate('/Dashboard/admin/product');
        // setCategoryName(''); // Clear the input field
        // getAllCategory();
      
      } else {
        toast.error('Failed to Delete Product ');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
   
    setShowModal(false);
  };





const handleFileChange = (file) => {
  setImageFile(file);
};


const getSingleProduct=async()=>{
    try{
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
        if(data.success)
        {
          console.log(data.product.category.name);
          console.log(data.product.photo);
          const{product}=data;
  Setname(product.name);
  Setdescription(product.description);
  Setprice(product.price);
  Setquantity(product.quantity);
  
  Setproduct(product);
  Setcategory(product.category._id);
  console.log(product.shipping);
  Setshipping(product.shipping);
//   setImageFile(null);


        }
      

    }
    catch(error)
    {
        console.log(error);
        toast.error("Something went wrong fetching");
        
    }
}

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
    alert("magar kyu");
  e.preventDefault();
  try {

    const formData = new FormData();
    console.log(price);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('shipping', shipping);
    imageFile && formData.append('photo', imageFile);
    const response=await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/product/update-product/${Product._id}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type for file upload
      }});
      if (response.data.success) {
        alert("sahi me");
        toast.success("Product Updated successfully");
navigate('/Dashboard/admin/product');
        getSingleProduct();
        // Optionally, you can reset the form fields and image here
        // Setname('');
        // Setprice('');
        // Setquantity('');
        // Setdescription('');
        // Setcategory('');
        // Setshipping('');
        // setImageFile(null);
      } else {
        toast.error("Failed to Update product");
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }

}

  useEffect(() => {

    getAllCategory();
  }, [])
  useEffect(() => {

    getSingleProduct();
  }, [imageFile])
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
                       onChange={(e)=>{Setquantity(e.target.value);
                        console.log(e.target.value)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product quantity" required />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price" id="price"
                       value={price}
                       onChange={(e)=>  {Setprice(e.target.value);
                    console.log(e.target.value)}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
              </div>
              <div>
                <label htmlFor="shipping" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping</label>
                <input type="text" name="shipping" id="shipping"
                       value={shipping }
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
                <div className="mb-3">
                {imageFile ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={Product?.photo?.url}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
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
            Update product
            </button>
            <button  type="button" onClick={handleDelete} className="text-white inline-flex items-center ml-4 mt-4  bg-red-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg  className="mr-1 -ml-1 w-6 h-6"   fill="white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24">
<path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
</svg>
            Delete product
            </button>
          </form>
       
          {showModal && (
          <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed top-0 left-0 right-0 z-50 p-4  flex items-center justify-center "
          >
            <div className="relative bg-white rounded-lg shadow  border-4 border-green-500 max-w-md">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                onClick={cancelDelete}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center bg-white-900">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-black">
                  Are you sure you want to delete this  Product?
                </h3>
                <button
                  onClick={confirmDelete}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={cancelDelete}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        )}
         


          {/* Rest of your AdminDashboard content */}
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
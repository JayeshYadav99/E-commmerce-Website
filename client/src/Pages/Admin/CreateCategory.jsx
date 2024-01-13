import React,{useEffect,useState} from "react";
import AdminMenu from "../../Components/Menu/AdminMenu";
import { NavLink,Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Modal } from 'antd';
import CategoryForm from "../../Components/Forms/CategoryForm";
const CreateCategory = () => {
  const [categories,Setcategories]=useState([]);
  const [showModal, setShowModal] = useState(false);
  const[categorydeleted,Setcategorydeleted]=useState(false);
  const handleDelete = (id) => {
    Setcategorydeleted(id);
   
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${categorydeleted}`);

      if (response.data.success) {
        toast.success('Category Deleted successfully');

        setCategoryName(''); // Clear the input field
        getAllCategory();
      
      } else {
        toast.error('Failed to Delete category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    Setcategorydeleted(-1);
    setShowModal(false);
  };

//For saving categories 
  const [categoryName, setCategoryName] = useState('');
  const handleCategoryNameChange = (event) => {

    setCategoryName(event.target.value);
  }


//For new categories
  const [newcategoryName, setnewCategoryName] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/category/create-category`, {
        name: newcategoryName,
       
      });

      if (response.data.success) {
        toast.success('Category created successfully');

        setCategoryName(''); // Clear the input field
        getAllCategory();
      
      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }


  //For editing Categories
const [isEditing,SetisEditing]=useState(false);
 const[editedCategoryid,SeteditedCategoryid]=useState(-1);



 //For saving edited categories
  const handleSaveClick=async()=>{
     
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${editedCategoryid}`, {
        name: categoryName,
       
      });

      if (response.data.success) {
        toast.success('Category Update successfully');

        setCategoryName(''); // Clear the input field
        getAllCategory();
      
      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
    SeteditedCategoryid(-1);
  }

  //Handling Editing Categories
  const handleEditClick=(id)=>{
    console.log(id);
    SeteditedCategoryid(id);
    
  const category = categories.find((cat) => cat._id === id);
  setCategoryName(category.name);
  }

  //Fetching all categories
  const getAllCategory=async()=>{
    try {

      const {data}=await axios(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
      if(data.success)
      {
        console.log(data.category[0].name);
Setcategories(data.category);
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching categories");
    }
  }
   useEffect(() => {
    
    getAllCategory();
  }, [])



  
 

 
  
  return (
    <Layout title={"Dashboard - Create Category"}>

<div className="flex">
        {/* AdminMenu */}
        <AdminMenu />

        {/* AdminDashboard */}
        <div className="flex-1 p-12">

            <h3 className="text-base font-semibold leading-7 text-gray-900">Manage Categories</h3>
          
      

         <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
  <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex md:flex-row items-center justify-between  space-y-3  md:space-y-0 md:space-x-4 p-4">
     
          <form className="flex mt-[-52px] ">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required />
           
            </div>
          
          </form>
       
     

          <CategoryForm handleSubmit={handleSubmit} value={newcategoryName} SetValue={setnewCategoryName}/>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  <tr>
    <th scope="col"  className="px-4 py-3">
      Category Name
    </th>
    <th scope="col" colSpan="2" className="px-4 mr-8 py-3">
      <h1 className="mr-8">Actions</h1>
    </th>
  </tr>
</thead>

          <tbody>
          {categories?.map(category=>(
            <tr className="border-b dark:border-gray-700">
              {/* <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iMac 27"</th> */}
              
             
               <td scope="row" key={category._id} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.name}</td>

             
            
              <td className=" py-3"> 

              {/* Edit Model */} 

              {!(editedCategoryid === category._id) ?(<>     
                                <button type="button"  onClick={()=>handleEditClick(category._id)} className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          Edit 
          </button> </>):(<><div className="flex items-center">
            <button onClick={()=>SeteditedCategoryid(-1)}>  <svg class="w-6 h-6 mr-4  text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg></button>
        
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
                       <button type="button"  onClick={()=>handleSaveClick(categoryName)} className="flex items-center justify-center text-white bg-green-700 ml-3 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                       <svg class="w-4 h-4 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
          Save
          </button>
         
        </div></>)}

          </td>

















          <td className="px-2 py-3 p-2"> 
                       <button type="button" onClick={()=>handleDelete(category._id)} className="flex items-center justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                       <svg class="w-3.5 h-3.5 mr-2 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
  </svg>
          Delete 
          </button> 
          </td>
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
                  Are you sure you want to delete this  category ?
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
         

             
            </tr>
    ))}
          </tbody>
        </table>
      </div>
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white px-2">1-10</span>
          of
          <span className="font-semibold text-gray-900 dark:text-white px-2">1000</span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</section>

        </div>
      </div>

    </Layout>
  );
};

export default CreateCategory;
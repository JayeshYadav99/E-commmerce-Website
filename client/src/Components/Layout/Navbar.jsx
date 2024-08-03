import React, { useState } from 'react'
import 'flowbite';
import { Link,NavLink } from 'react-router-dom';
import {useAuth} from "../../Context/Auth"
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/shopping-bag.png"
import Profile from "../../assets/profile.png"
import SearchInput from '../Forms/SearchInput';
import { useCart } from '../../Context/Cart';
export default function Navbar() {


 const [auth,SetAuth]=useAuth();
 const [cartItems, setCartItems] = useCart();
 

 //Dropdowns
  const [dropdowns, setDropdowns] = useState({
    appsDropdown: false,

    profileDropdown: false,
    notificationDropdown: false,
  });
  const toggleDropdown = (dropdownName) => {
    setDropdowns((prevDropdowns) => {
      const updatedDropdowns = {};

      // Close all other dropdowns
      for (const name in prevDropdowns) {
        updatedDropdowns[name] = false;
      }

      // Toggle the selected dropdown
      updatedDropdowns[dropdownName] = !prevDropdowns[dropdownName];

      return updatedDropdowns;
    });
  };

//Logout functionality
const handleLogout=()=>{
  SetAuth({
    ... auth,
    user:null,
    token:''
  });
  setCartItems([]);
  localStorage.removeItem("cart");

  localStorage.removeItem("auth");
  toast.success("Logged Out Successfully");
}


  return (
    <div><header>
      <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2 w-full  dark:bg-gray-800 ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
           
            <img src={ Logo}className="mr-3 h-8" alt="Website Logo" />
         <Link to="/">
        

<span className="self-center text-2xl  mr-4 font-semibold whitespace-nowrap text-white dark:text-white">
PureCart
</span>
         </Link>
            
     
 
          </div>
          <SearchInput/>
          <div className="flex items-center lg:order-2">
          <ul className="flex space-x-4 px-4">
      <li>
        
        <NavLink
          to="/"
          exact
          activeClassName="text-indigo-500" // Apply active styling here
          className="text-white hover:text-red-200"
        >
          Home
        </NavLink>
      </li>
      <li>
      <NavLink
          to="/Budget"
          exact
          activeClassName="text-indigo-500" // Apply active styling here
          className="text-white hover:text-red-200"
        >
          Budget
        </NavLink>
      </li>


      {!auth.user ? (   <>
        <li>
        <NavLink
          to="/login"
          activeClassName="text-indigo-500" // Apply active styling here
          className="text-white hover:text-red-200"
        >
          Login
        </NavLink>
      </li>
            <li>
            <NavLink
              to="/signup"
              activeClassName="text-indigo-500" // Apply active styling here
              className="text-white hover:text-red-200"
            >
              Register
            </NavLink>
          </li></>  ):( <li>
            <NavLink
              to="/"
              activeClassName="text-indigo-500" // Apply active styling here
              className="text-white hover:text-red-200"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          </li>)}
      {/* <li>
        <NavLink
          to="/category"
          activeClassName="text-indigo-500" // Apply active styling here
          className="text-white hover:text-red-200"
        >
          Category
        </NavLink>
      </li> */}
      <li>
  <NavLink
    to="/cart"
    activeClassName="text-indigo-500" // Apply active styling here
    className="text-white hover:text-red-200 relative flex items-center"
  >
    {/* FontAwesome Shopping Cart Icon */}

      <div class="absolute mt-2  mr-8 py-2">
        <div class="t-0 absolute left-3">
          {cartItems && cartItems.length > 0 && (
            <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs">
              {cartItems?.length || 0}
            </p>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="file: mt-4 h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
  
  </NavLink>
</li>
    </ul>

   
       
      
            <button
              type="button"
              onClick={() => toggleDropdown('appsDropdown')}
              data-dropdown-toggle="apps-dropdown"
              className="p-2 text-gray-500 rounded-lg ml-16 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>
              {/* Icon */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div className={` z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600" id="apps-dropdown ${dropdowns.appsDropdown ? "block" : "hidden"}`} style={{ position: "absolute", right: "1rem", top: "3.5rem" }}>
              <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                Perks
              </div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <Link to="/Dashboard/admin" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Admin</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Customers</div>
                </Link>
          
                <Link to="/Dashboard/user/profile" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Profile</div>
                </Link>
        
                <Link to="/ProductGallery" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Products</div>
                </Link>
                <Link to="/Budget" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Budget</div>
                </Link>
               
                
                {!auth.user ? (   <>
        <li>
        <NavLink
          to="/login"
          activeClassName="text-indigo-500" // Apply active styling here
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
             <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                <div className="text-sm text-gray-900 dark:text-white">Logout</div>
          Login
        </NavLink>
      </li>
           
            </>  ):( <li>
            <NavLink
              to="/"
              activeClassName="text-indigo-500" // Apply active styling here
              className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              onClick={handleLogout}
            >
                <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                <div className="text-sm text-gray-900 dark:text-white">Logout</div>
            </NavLink>
          </li>)}
                
              </div>
            </div>
            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              onClick={() => toggleDropdown('profileDropdown')}
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={Profile}
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className={` z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${dropdowns.profileDropdown ? "block" : "hidden"
                }`}
              id="dropdown"
              style={{ position: "absolute", right: "1rem", top: "3.5rem" }}

            >
               {   auth?.user && 
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {auth?.user?.name}
                </span>
                <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
                {auth?.user?.name}
                </span>
              </div>
}
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                    {   auth?.user && 

                 <li>
                  <Link
                    to="/Dashboard/user/profile"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    My profile
                  </Link>
                </li>
  
}
             {   auth?.user?.role ===1 &&
                <li>
                  <Link
                    to={auth?.user?.role ===1 ? "/Dashboard/admin" :"/Dashboard/user"}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                   Admin Dashboard
                  </Link>
                </li>
}
     
              </ul>
         
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >

{!auth.user ? (   <>
        <li>
        <NavLink
          to="/login"
          activeClassName="text-indigo-500" // Apply active styling here
          className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Login
        </NavLink>
      </li>
            <li>
            <NavLink
              to="/signup"
              activeClassName="text-indigo-500" // Apply active styling here
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Register
            </NavLink>
          </li></>  ):(
            
            <>
             <li>
        <NavLink
          to="/Budget"
          activeClassName="text-indigo-500" // Apply active styling here
          className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Budget
        </NavLink>
      </li>
            <li>
            <NavLink
              to="/"
              activeClassName="text-indigo-500" // Apply active styling here
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleLogout}
            >
               Sign out
            </NavLink>
          </li></>)} 
               
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </div>
  )
}

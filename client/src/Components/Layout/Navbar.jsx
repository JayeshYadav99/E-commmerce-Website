import React, { useState } from 'react'
import 'flowbite';
import { Link,NavLink } from 'react-router-dom';
import {useAuth} from "../../Context/Auth"
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/online-shopping.png"
import Profile from "../../assets/profile.png"
import SearchInput from '../Forms/SearchInput';
import { useCart } from '../../Context/Cart';
export default function Navbar() {

const[cartItems,setCartItems]=useCart();
 const [auth,SetAuth]=useAuth();

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
  ShopSage
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
      <li>
        <NavLink
          to="/category"
          activeClassName="text-indigo-500" // Apply active styling here
          className="text-white hover:text-red-200"
        >
          Category
        </NavLink>
      </li>
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
              className="hidden sm:inline-flex items-center justify-center text-white ml-8  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xl px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                aria-hidden="true"
                className="mr-1 -ml-1 w-7 h-7"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              Wishlist
            </button>
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>
              {/* Search icon */}
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
      
            <button
              type="button"
              onClick={() => toggleDropdown('appsDropdown')}
              data-dropdown-toggle="apps-dropdown"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                Apps
              </div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Sales</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Users</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Inbox</div>
                </Link>
                <Link to="/Dashboard/user/profile" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Profile</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Settings</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Products</div>
                </Link>
                <Link to="/Budget" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Budget</div>
                </Link>
                <Link to="#" className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true" className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"></path></svg>
                  <div className="text-sm text-gray-900 dark:text-white">Billing</div>
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
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {auth?.user?.name}
                </span>
                <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
                {auth?.user?.name}
                </span>
              </div>
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                 <li>
                  <Link
                    to="/Dashboard/user/profile"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    My profile
                  </Link>
                </li>
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
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Account settings
                  </a>
                </li>
              </ul>
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2 w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    My likes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2 w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>{" "}
                    Collections
                  </a>
                </li>
            
              </ul>
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
 <li>
        <NavLink
          to="/Budget"
          activeClassName="text-indigo-500" // Apply active styling here
          className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Budget
        </NavLink>
      </li>
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
          </li></>  ):( <li>
            <NavLink
              to="/"
              activeClassName="text-indigo-500" // Apply active styling here
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleLogout}
            >
               Sign out
            </NavLink>
          </li>)} 
               
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </div>
  )
}

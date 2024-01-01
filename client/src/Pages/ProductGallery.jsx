import React, { useState, useRef, useEffect,useCallback } from 'react'
import { useAuth } from '../Context/Auth'
import axios from "axios";
import Layout from '../Components/Layout'
import 'react-toastify/dist/ReactToastify.css';
import {Prices}  from '../Components/Prices';
import { BarLoader } from 'react-spinners';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import { useSearch } from "./../Context/Search";
import Skeleton from 'react-loading-skeleton';

import { useCart } from '../Context/Cart';
const ProductGallery = () => {
    const[cartItems,SetcartItems]=useCart();
    const navigate=useNavigate()
    const [searchQuery, setSearchQuery] = useSearch();
    const[products,Setproducts]=useState([]);
    const[categories,Setcategories]=useState([]);
    const[Loading,SetLoading]=useState(false);
    const[PageLoading,SetPageLoading]=useState(false);
    const [auth, SetAuth] = useAuth();
    const[checked,Setchecked]=useState([]);
    const [radio, setRadio] = useState([]);
const[total,Settotal]=useState();
const[page,Setpage]=useState(1);
const observer = useRef()
    const [isSectionOpen, setIsSectionOpen] = useState({
        colorSection: false,
        categorySection: false,
        SizeSection: false,
        SortSection:false,
        DialogSection:false,
    });

    const toggleSection = (section) => {
        setIsSectionOpen((prevIsSectionOpen) => ({
            ...prevIsSectionOpen,
            [section]: !prevIsSectionOpen[section],
        }));
    };
    const getAllproducts=async()=>{
        try {
    SetLoading(true);
    const keyword = searchQuery.keyword || 'all'; 
    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/search/${keyword}/${searchQuery.page}`,
        { checked, radio }
      );
      
      
          SetLoading(false);
          Setpage(searchQuery.page);
          if(data.success)
          {
           
            // console.log(data.products[0].category.name);
            console.log(data);
    Setproducts(data.result);
 Settotal(data.resultCount || data.productsCount);
    
          }
        
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong fetching products");
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
    //    useEffect(() => {
        
    //     getAllproducts();
    //   }, [])
      useEffect(() => {

        getAllCategory();
      }, [])
      useEffect(() => {
        if (checked.length || radio.length) getAllproducts(); Filterproduct();
      }, [checked, radio]);

      const handleSort = (sortBy) => {
        // SetLoading(true);
   
          Setproducts((prevProducts) => {
            if (sortBy === "price-low-to-high") {
              return prevProducts.slice().sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-high-to-low") {
              return prevProducts.slice().sort((a, b) => b.price - a.price);
            }
            // Add more sorting options as needed
            return prevProducts; // If an invalid option is provided, return the original array
          });
    
    
      };
      const handleFilter=(value,id)=>{
        let all=[...checked];
        console.log(checked)
        if(value)
        {
            all.push(id);
        }
        else
        {
            all=all.filter((c)=> c!==id);
                }
                Setchecked(all);

      }
      const Filterproduct=async()=>{
        try {

            const { data } = await axios.post (`${import.meta.env.VITE_API_URL}/api/v1/product/product-filter`,{
                checked,radio
            });
            
            // Setproducts(data.products);
            
        } catch (error) {
            console.log(error);
            
        }
      }
    
    const loadMoreProducts = async () => {
        try {
            console.log(page)
           console.log(searchQuery.page)
            SetPageLoading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/product/search/${searchQuery.keyword}/${page}`,
                { checked, radio }
              );

            if (data.success) {
                console.log(products);
                SetPageLoading(false);
                Setproducts((prevProducts) => [...prevProducts, ...data.result]);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong loading more products");
        }
    };
 
    const handleAddToCart = async (product) => {
        if (!auth) return navigate("/login");
       

        try {
            const {data}=await axios.put( `${import.meta.env.VITE_API_URL}/api/v1/cart/${auth.user._id}`, { productId: product._id, quantity: 1, action: 'addItem' } );
            console.log(data);
            SetcartItems((prevCartItems) => [...data.items]);
            toast.success("Product added to cart");
            localStorage.setItem("cart", JSON.stringify(data.items));
            
        } catch (error) {
            console.log(error);
            
        }


            }






    useEffect(() => {
        if (page === 1) return;
        loadMoreProducts();
      }, [page]);
      useEffect(() => {
        if (!checked.length || !radio.length) getAllproducts();
      }, [checked.length, radio.length,searchQuery.keyword]);
    return (
        <Layout title={"All Products Gallery"}>
            <div className="bg-white ">
             
                <div>
                    {/*
Mobile filter dialog

Off-canvas filters for mobile, show/hide based on off-canvas filters state.
    */}
    {!isSectionOpen.DialogSection &&
                    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
                        {/*
  Off-canvas menu backdrop, show/hide based on off-canvas menu state.

  Entering: "transition-opacity ease-linear duration-300"
    From: "opacity-0"
    To: "opacity-100"
  Leaving: "transition-opacity ease-linear duration-300"
    From: "opacity-100"
    To: "opacity-0"
*/}
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                        <div className="fixed inset-0 z-40 flex">
                            {/*
    Off-canvas menu, show/hide based on off-canvas menu state.

    Entering: "transition ease-in-out duration-300 transform"
      From: "translate-x-full"
      To: "translate-x-0"
    Leaving: "transition ease-in-out duration-300 transform"
      From: "translate-x-0"
      To: "translate-x-full"
  */}
                            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button type="button" onClick={()=>toggleSection("DialogSection")} className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Filters */}
                        <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        <li>
                                            <a href="#" className="block px-2 py-3">Totes</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-2 py-3">Backpacks</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-2 py-3">Travel Bags</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-2 py-3">Hip Bags</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-2 py-3">Laptop Sleeves</a>
                                        </li>
                                    </ul>
                                    <div className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            {/* Expand/collapse section button */}
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 `}
                                                onClick={() => toggleSection("colorSection")}
                                                aria-controls="filter-section-mobile-0"
                                            // aria-expanded={isSectionOpen}
                                            >
                                                <span className="font-medium text-gray-900">Colors</span>
                                                <span className="ml-6 flex items-center">
                                                    {/* Expand icon, show/hide based on section open state. */}
                                                    {isSectionOpen.colorSection ? (<svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>) : (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>)}

                                                    {/* Collapse icon, show/hide based on section open state. */}

                                                </span>
                                            </button>
                                            {/* Content of the section here */}
                                        </h3>
                                        {/* Content of the section here */}
                                        {isSectionOpen.colorSection && <div className="pt-6" id="filter-section-0">
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <input id="filter-color-0" name="color[]" defaultValue="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-1" name="color[]" defaultValue="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-2" name="color[]" defaultValue="blue" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-3" name="color[]" defaultValue="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-4" name="color[]" defaultValue="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-5" name="color[]" defaultValue="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                                                </div>
                                            </div>
                                        </div>}

                                        {/* Filter section, show/hide based on section state. */}

                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            {/* Expand/collapse section button */}
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 `}
                                                onClick={() => toggleSection("categorySection")}
                                                aria-controls="filter-section-mobile-0"
                                            // aria-expanded={isSectionOpen}
                                            >
                                                <span className="font-medium text-gray-900">Category</span>
                                                <span className="ml-6 flex items-center">
                                                    {/* Expand icon, show/hide based on section open state. */}
                                                    {isSectionOpen.categorySection ? (<svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>) : (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>)}

                                                    {/* Collapse icon, show/hide based on section open state. */}

                                                </span>
                                            </button>
                                            {/* Content of the section here */}
                                        </h3>
                                        {/* Filter section, show/hide based on section state. */}
                                        {isSectionOpen.categorySection && <div className="pt-6" id="filter-section-mobile-1">
                                            <div className="space-y-6">
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-category-0" name="category[]" defaultValue="new-arrivals" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500">New Arrivals</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-category-1" name="category[]" defaultValue="sale" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-category-2" name="category[]" defaultValue="travel" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-category-3" name="category[]" defaultValue="organization" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500">Organization</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-category-4" name="category[]" defaultValue="accessories" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500">Accessories</label>
                                                </div>
                                            </div>
                                        </div>}

                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            {/* Expand/collapse section button */}
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 `}
                                                onClick={() => toggleSection("SizeSection")}
                                                aria-controls="filter-section-mobile-0"
                                            // aria-expanded={isSectionOpen}
                                            >
                                                <span className="font-medium text-gray-900">Size</span>
                                                <span className="ml-6 flex items-center">
                                                    {/* Expand icon, show/hide based on section open state. */}
                                                    {isSectionOpen.SizeSection ? (<svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>) : (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>)}
                                                </span>
                                            </button>
                                        </h3>
                                        {/* Filter section, show/hide based on section state. */}
                                        {isSectionOpen.SizeSection &&    <div className="pt-6" id="filter-section-mobile-2">
                                            <div className="space-y-6">
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-0" name="size[]" defaultValue="2l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-0" className="ml-3 min-w-0 flex-1 text-gray-500">2L</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-1" name="size[]" defaultValue="6l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-1" className="ml-3 min-w-0 flex-1 text-gray-500">6L</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-2" name="size[]" defaultValue="12l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-2" className="ml-3 min-w-0 flex-1 text-gray-500">12L</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-3" name="size[]" defaultValue="18l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-3" className="ml-3 min-w-0 flex-1 text-gray-500">18L</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-4" name="size[]" defaultValue="20l" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-4" className="ml-3 min-w-0 flex-1 text-gray-500">20L</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-mobile-size-5" name="size[]" defaultValue="40l" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-mobile-size-5" className="ml-3 min-w-0 flex-1 text-gray-500">40L</label>
                                                </div>
                                            </div>
                                        </div> }
                                    
                                    </div>
                                </form>
                             
                            </div>
                        </div>
                    </div>
}
                    <main className="mx-auto max-w-7xl  ">
                   
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals                               </h1>
                   
                            <div className="flex items-center">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button"  onClick={()=>toggleSection("SortSection")} className={` group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900`} id="menu-button" aria-expanded="false" aria-haspopup="true">
                                            Sort
                                            <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/*
        Dropdown menu, show/hide based on menu state.

        Entering: "transition ease-out duration-100"
          From: "transform opacity-0 scale-95"
          To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
          From: "transform opacity-100 scale-100"
          To: "transform opacity-0 scale-95"
      */}
                                    <div className={`${!isSectionOpen.SortSection ? "hidden":"block"} absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                        <div className="py-1" role="none">
                                            {/*
            Active: "bg-gray-100", Not Active: ""

            Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
          */}
                                            <button className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1}  onClick={handleSort} id="menu-item-0">Most Popular</button>
                                            <button className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Best Rating</button>
                                            <button className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">Newest</button>
                                            <button className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-3" onClick={()=>handleSort("price-low-to-high")} >Price: Low to High</button>
                                            <button className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-4"  onClick={()=>handleSort("price-high-to-low")}>Price: High to Low</button>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                    <span className="sr-only">View grid</span>
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                                    <span className="sr-only">Filters</span>
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            
                          
                        </div>
                        <div className='flex  max-w-5xl justify-center ml-80 items-center'> {Loading && <BarLoader color="#36d7b7"  height={9} width="100%" />}</div>
                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                      
                            <h2 id="products-heading" className="sr-only">Products</h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                   
                                    <div className="border-b border-gray-200 py-6">
    <h3 className="-mx-2 -my-3 flow-root">
        {/* Expand/collapse section button */}
        <button
            type="button"
            className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 `}
            onClick={() => toggleSection("SizeSection")}
            aria-controls="filter-section-mobile-0"
        >
            <span className="font-medium text-gray-900">Price</span>
            <span className="ml-6 flex items-center">
                {/* Expand icon, show/hide based on section open state. */}
                {!isSectionOpen.SizeSection ? (
                    <svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                ) : (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                )}
            </span>
        </button>
    </h3>
    {/* Filter section, show/hide based on section state. */}
    {isSectionOpen.SizeSection && (
        <div className="pt-6" id="filter-section-mobile-2">
            <div className="space-y-6">
                {Prices.map((price) => {
                    const priceValues = `${price.array}`.split(',').map(parseFloat);
                    return (
                        <div className="flex items-center" key={price._id}>
                            <input
                                id={`filter-mobile-size-${price._id}`}
                                type="radio"
                                name="prices[]"
                                value={price.array}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={() => {
                                    setRadio(priceValues);
                                    console.log(priceValues);
                                }}
                                checked={radio[0] === priceValues[0] && radio[1] === priceValues[1]}
                            />
                            <label htmlFor={`filter-mobile-size-${price._id}`} className="ml-3 min-w-0 flex-1 text-gray-500">
                                {price.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )}
</div>



                                    <div className="border-b border-gray-200 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            {/* Expand/collapse section button */}
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 ${isSectionOpen ? "block" : "block"} `}
                                                onClick={() => toggleSection("colorSection")}
                                                aria-controls="filter-section-mobile-0"
                                            // aria-expanded={isSectionOpen}
                                            >
                                                <span className="font-medium text-gray-900">Color</span>
                                                <span className="ml-6 flex items-center">
                                                    {/* Expand icon, show/hide based on section open state. */}
                                                    {!isSectionOpen.colorSection ? (<svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>) : (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>)}

                                                    {/* Collapse icon, show/hide based on section open state. */}

                                                </span>
                                            </button>
                                        </h3>
                                        {/* Content of the section here */}
                                        {isSectionOpen.colorSection && <div className="pt-6" id="filter-section-0">
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <input id="filter-color-0" name="color[]" defaultValue="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-1" name="color[]" defaultValue="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-2" name="color[]" defaultValue="blue" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-3" name="color[]" defaultValue="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-4" name="color[]" defaultValue="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input id="filter-color-5" name="color[]" defaultValue="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                                                </div>
                                            </div>
                                        </div>}

                                        {/* Filter section, show/hide based on section state. */}

                                    </div>
                                    <div className="border-b border-gray-200 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            {/* Expand/collapse section button */}
                                            <button
                                                type="button"
                                                className={`flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 `}
                                                onClick={() => toggleSection("categorySection")}
                                                aria-controls="filter-section-mobile-0"
                                            // aria-expanded={isSectionOpen}
                                            >
                                                <span className="font-medium text-gray-900">Category</span>
                                                <span className="ml-6 flex items-center">
                                                    {/* Expand icon, show/hide based on section open state. */}
                                                    {!isSectionOpen.categorySection ? (<svg className="h-10 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>) : (<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                    </svg>)}

                                                    {/* Collapse icon, show/hide based on section open state. */}

                                                </span>
                                            </button>
                                            {/* Content of the section here */}
                                        </h3>
                                        {/* <h1> rdrd {JSON.stringify(checked,null,4)}</h1> */}
                                        {/* Filter section, show/hide based on section state. */}
                                        {isSectionOpen.categorySection && <div className="pt-6" id="filter-section-mobile-1">
                                            <div className="space-y-6">
                                                {categories.map((category)=>(
                                                     <div className="flex items-center">
                                                         
                                                     <input id="filter-mobile-category-0" name="category[]" defaultValue="new-arrivals" type="checkbox" onChange={(e)=>handleFilter(e.target.checked,category._id)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                     <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-gray-500">{category.name}</label>
                                                 </div>
                                                ))}

                                            </div>
                                        </div>}
                                        <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                        onClick={()=>window.location.reload()}
                                                    >
                                                        Reset Filters
                                                    </button>
                                    </div>
                                 
                                </form>
                                {/* Product grid */}

                              
                                <div className="lg:col-span-3">
                                    
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Loading && (
  Array.from({ length: 6 }).map((_, index) => (
    <div key={index} role="status" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow animate-pulse dark:bg-gray-800 dark:border-gray-700">
      <div className="p-8 rounded-t-lg bg-center h-48 flex items-center justify-center" style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
      </div>

      <div className="px-5 pb-5">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 me-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
          </div>
        </div>
        
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ))
)}


                                {  products.map((product) => (

    
 
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
<button
    onClick={() => {
        handleAddToCart (product);
    }}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
>
    Add to cart
</button>
</div>
</div>
</div>
  
  
))}
                                {PageLoading && (
  Array.from({ length: 6 }).map((_, index) => (
    <div key={index} role="status" className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow animate-pulse dark:bg-gray-800 dark:border-gray-700">
      <div className="p-8 rounded-t-lg bg-center h-48 flex items-center justify-center" style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
      </div>

      <div className="px-5 pb-5">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 me-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
          </div>
        </div>
        
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ))
)}


{products.length < total && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            Setpage(page + 1);
                          }}
                    >
                        Load More
                    </button>
                )}



                                    </div>
                                </div>
                            </div>
                        </section>
                        
                    </main>
                </div>
            </div>

        </Layout>
    )
}

export default ProductGallery
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../../Context/Search'
import axios from 'axios'
const SearchInput = () => {
const navigate=useNavigate();

    const[searchQuery,setSearchQuery]=useSearch()


    return (
        <div className="hidden lg:block lg:pl-2">
            {/* <input
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search..."
                value={searchQuery.keyword}
                onChange={(e=>setSearchQuery({...searchQuery,keyword:e.target.value}))}
            /> */}
             <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  value={searchQuery.keyword}
                  onChange={(e=>setSearchQuery({...searchQuery,keyword:e.target.value}))}
                />
              </div>
        </div>
    )
}

export default SearchInput
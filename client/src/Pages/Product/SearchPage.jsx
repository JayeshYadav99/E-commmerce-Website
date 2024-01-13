
import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useSearch } from "../../Context/Search";

const Search = () => {
    const [searchQuery, setSearchQuery] = useSearch();
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Search Results</h1>
                    <h6 className="mt-2">
                        {/* {JSON.stringify(searchQuery)} */}
                        {searchQuery?.results?.length < 1
                            ? "No Products Found"
                            : `Found ${searchQuery?.results.length}`}
                    </h6>
                    <div className="flex flex-wrap mt-4 p-4">
                    
                                                      {  searchQuery?.results.map((product) => (

    
 
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
<a href="#">
<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
{product?.name}
</h5>
</a>
<div className="flex items-center mt-2.5 mb-5">
{/* Add your content here */}
</div>
<div className="flex items-center justify-between">
<span className="text-3xl font-bold text-gray-900 dark:text-white">
{product?.price}$
</span>
<a
href="#"
className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
>
Add to cart
</a>
</div>
</div>
</div>


))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
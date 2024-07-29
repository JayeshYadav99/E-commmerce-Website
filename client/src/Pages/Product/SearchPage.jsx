import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { truncateText } from "../../Components/Utility/helpers";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
//   const navigate = useNavigate();
  const location = useLocation();

  const getAllProducts = async (keyword) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/search/${keyword}/${1}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.result);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching products");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword") || "all";
    getAllProducts(keyword);
  }, [location.search]);

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <div className="lg:col-span-3 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    role="status"
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow animate-pulse dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div
                      className="p-8 rounded-t-lg bg-center h-48 flex items-center justify-center"
                      style={{
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
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
                ))}

              {products.map((product) => (
                <div
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={product._id}
                >
                  <Link to={`/product/${product?.slug}`}>
                    {product?.photo && (
                      <div
                        className="p-8 rounded-t-lg bg-center h-48"
                        style={{
                          backgroundImage: `url(${product?.photo[0]?.url})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    )}
                  </Link>
                  <div className="px-5 pb-5">
                    <Link to={`/product/${product?.slug}`}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {truncateText(product?.name, 32)}
                      </h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                      {/* Additional product details */}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product?.price}₹
                      </span>
                      <button
                        onClick={() => {
                          // Handle Add to Cart functionality
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

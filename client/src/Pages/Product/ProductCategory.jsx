import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { truncateText } from '../../Components/Utility/helpers';

const CategoryPage = () => {
  const { categoryId } = useParams(); // Fetch category ID from the URL
  const [products, setProducts] = useState([]);
  const[categoryName,setCategoryName]=useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/category/${categoryId}`);
        setProducts(data.products);
    setCategoryName(data.name);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <Layout title="Category Page">
      <div className="container mx-auto px-4 py-8">

             <div className="flex  max-w-5xl justify-center ml-80 items-center">
             {" "}
             {loading && <BarLoader color="#36d7b7" height={9} width="100%" />}
           </div>
           <h1 className="text-3xl font-bold mb-6 text-center">{categoryName}</h1>
    
      
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            {products.map(product => (
               
              <Link to={`/product/${product.slug}`} key={product._id} className='border-blue-600 border-4'>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div
                  className="p-8 rounded-t-lg bg-center h-48"
                  style={{
                    backgroundImage: `url(${product.photo[0].url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* You can add an overlay or loading spinner here if needed */}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {truncateText(product.name,42)}
                </h3>
              </div>
            </Link>
            ))}
          </div>
        
      </div>
    </Layout>
  );
};

export default CategoryPage;

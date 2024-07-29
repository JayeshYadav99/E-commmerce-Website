import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { truncateText } from "../Utility/helpers";
import axios from "axios";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="p-8 rounded-t-lg bg-gray-200 h-48 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded mt-4 w-3/4 animate-pulse"></div>
    </div>
  );
};

const CategorySkeleton = () => {
  return (
    <div>
      <h3 className="text-3xl font-semibold mb-4 mt-4 bg-gray-200 h-8 w-1/4 animate-pulse"></h3>
      <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 bg-gray-100">
        {[...Array(4)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const ProductsGridSkeleton = () => {
  return (
    <div>
      {[...Array(3)].map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );
};
const Catalog = () => {
  const [Loading,SetLoading]=useState(false);
  const [groupedProducts, setGroupedProducts] = useState({});

  const getAllProducts = async () => {
    try {
SetLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-all-products`
      );

      SetLoading(false);
      if (data.success) {
        setGroupedProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section id="shop" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* <h2 className="text-4xl font-bold mb-8">Products</h2> */}
        {/* <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" /> */}
{Loading ? ( <ProductsGridSkeleton />):(
  <>
       {Object.keys(groupedProducts).map((category) => (
          <div key={category}>
            <h3 className="text-3xl font-semibold mb-4 mt-4">{category}</h3>
            <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 bg-gray-100">
              {groupedProducts[category].map((product) => (
                <Link to={`/product/${product.slug}`} key={product._id}>
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
                      {truncateText(product.name, 31)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}</>
)}
   
      </div>
    </section>
  );
};

export default Catalog;

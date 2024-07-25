import React from "react";
import { toast } from "react-toastify";
import { GiShoppingCart } from "react-icons/gi";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { truncateText } from "../Utility/helpers";
const Catalog = () => {
  const [products, Setproducts] = useState([]);

  const getAllproducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product//get-all-products`
      );

      if (data.success) {
        // console.log(data.products[0].category.name);
        console.log(data);
        Setproducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching products");
    }
  };
  useEffect(() => {
    getAllproducts();
  }, []);
  return (
    <section id="shop" className="py-16">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-4xl font-bold mb-8 ">Soft Drinks</h2>
        <hr class="h-px my-8 bg-red-500 border-0 dark:bg-gray-700"></hr>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 bg-gray-100">
          {/* Product Card */}
          {products &&
            products.map((product) => (
                <Link to={`/product/${product?.slug}`}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
               
                {/* <img src={`${product?.photo[0]?.url}`} alt="Product" className="w-full h-40  mb-4 rounded" /> */}
                <div
                  className="p-8 rounded-t-lg  bg-center h-48"
                  style={{
                    backgroundImage: `url(${product?.photo[0]?.url} )`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    //   backgroundSize: 'contain',
                  }}
                >
                  {/* You can add an overlay or loading spinner here if needed */}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {truncateText(product?.name, 31)}
                </h3>
              </div>
              </Link>
            ))}

          {/* Repeat Product Card for more products */}
        </div>
      </div>
    </section>
  );
};

export default Catalog;

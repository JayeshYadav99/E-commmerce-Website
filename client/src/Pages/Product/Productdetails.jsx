import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/Auth";
import { truncateText } from "../../Components/Utility/helpers";
import Placeholder from "../../assets/placeholder.png";
import { useCart } from "../../Context/Cart";
const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-8 rounded-t-lg bg-gray-200 h-48 animate-pulse"></div>
      <div className="px-5 pb-5">
        <div className="h-6 bg-gray-200 rounded w-3/4  mx-auto mb-4 mt-4 animate-pulse"></div>

        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-blue-200 rounded-lg w-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
const Productdetails = () => {
  const params = useParams();
  const [cartItems, setCartItems] = useCart();
  const [product, Setproduct] = useState({});
  const [similarproducts, Setsimilarproducts] = useState([]);
  const [auth, SetAuth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(
    product?.photo?.[0]?.url || Placeholder
  );

  const handleAddToCart = async (product) => {
    if (!auth) return navigate("/login");

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/cart/${auth.user._id}`,
        { productId: product._id, quantity: 1, action: "addItem" }
      );
      console.log(data,auth?.budget);

      setCartItems((prevCartItems) => [...data.populatedCart.items]);
      if (data.total > auth?.user?.budget || data.total > auth?.budget) {
        toast.error("You have exceeded your budget");
        return;
      }
      toast.success("Product added to cart");
      localStorage.setItem("cart", JSON.stringify(data.populatedCart.items));
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setLoading(false);
      if (data.success) {
        console.log(data.product.photo.url);
        Setproduct(data.product);
        setMainImage(data.product.photo[0].url);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching Product");
    }
  };
  const getSimilarProduct = async () => {
    try {
      console.log(product);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-similar-product/${
          product._id
        }/${product.category._id}`
      );
      if (data.success) {
        console.log(data);
        Setsimilarproducts(data.products);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong fetching similar product");
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params.slug]);
  useEffect(() => {
    if (product) {
      getSimilarProduct();
    }
  }, [product]);
  return (
    <div>
      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Skeleton Loader
            <div className="animate-pulse">
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="space-y-4">
                  <div className="w-full h-[500px] bg-gray-200 rounded"></div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    <div className="h-[100px] w-[100px] bg-gray-200 rounded"></div>
                    <div className="h-[100px] w-[100px] bg-gray-200 rounded"></div>
                    <div className="h-[100px] w-[100px] bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>

                <div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>

                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex items-baseline space-x-2 mb-4">
                    <div class="text-4xl font-bold bg-white text-red-600 h-8 rounded w-1/3">
                      ₹<span class=" bg-gray-200  rounded "></span>
                    </div>
                  </div>
                  <div className="h-8 text-lg font-semibold rounded w-1/3 mb-6">
                    {" "}
                    Description
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-6 text-2xl font-semibold  rounded w-1/3 mb-4">
                    {" "}
                    Specifications
                  </div>
                  <div className="mt-4">
                    <div className="border-t border-b py-4 space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6  rounded w-1/4">
                  {" "}
                  Customers also purchased{" "}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-center p-4 ">
                    {product && product.photo && product.photo.length > 0 && (
                      <img
                        // src={product?.photo[0]?.url}
                        src={mainImage}
                        alt="Product"
                        className="h-[500px] w-full object-contain"
                        height={500}
                        // style={{ aspectRatio: "300 / 500", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {product?.photo?.map((photo, index) => (
                      <button
                        key={index}
                        className="focus:outline-none"
                        onClick={() => setMainImage(photo.url)}
                      >
                        <img
                          src={photo.url}
                          alt={`Product thumbnail ${index}`}
                          className={`h-[100px] w-[100px] object-cover ${
                            photo.url === mainImage
                              ? "border-red-500"
                              : "border-black"
                          } border-2 `}
                          width={100}
                          height={100}
                          style={{
                            aspectRatio: "100 / 100",
                            objectFit: "cover",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#ffcc00]"
                    onClick={() => {
                     
                      if (product) handleAddToCart(product);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
                <div>
                  {/* <nav aria-label="Breadcrumb">
                  <ol className="flex space-x-2 text-sm text-gray-500">
                    <li>Home</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-gray-400"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <li>Grocery</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-gray-400"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <li>Snacks &amp; Beverages</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-gray-400"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <li>Soft Drinks</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-gray-400"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <li>Cold Drinks</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-gray-400"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <li className="font-medium text-gray-900">
                      Coca-Cola Original Taste Soft Drink PET Bottle (2.25 L)
                    </li>
                    
                  </ol>
                </nav> */}

                  <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {product?.name}
                  </h2>
                  <div class="flex items-center space-x-2 my-2">
                    <div class="flex items-center text-yellow-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2"></path>
                      </svg>
                    </div>
                  </div>
                  <span class="text-sm font-medium text-gray-600">
                    1,945 Ratings &amp; 144 Reviews
                  </span>
                  <div class="flex items-baseline space-x-2 mb-4">
                    <span class="text-4xl font-bold text-red-600">
                      ₹{product?.price}
                    </span>
                  </div>
                  <h3 class="text-lg font-semibold">Description</h3>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {product?.description}
                  </p>
                  <div class=" mx-auto">
                    <h2 class="text-2xl font-semibold">Specifications</h2>

                    <div class="mt-4">
                      <div className="border-t border-b py-4 space-y-4">
                        {product?.specifications?.map((spec, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{spec.key}</span>
                            <span className="text-sm">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Customers also purchased
                  </h2>

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {similarproducts &&
                      similarproducts.map((newproduct) => (
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <Link to={`/product/${newproduct?.slug}`}>
                            <div
                              className="p-8 rounded-t-lg  bg-center h-48"
                              style={{
                                backgroundImage: `url(${newproduct.photo[0].url})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                //   backgroundSize: 'contain',
                              }}
                            >
                              {/* You can add an overlay or loading spinner here if needed */}
                            </div>
                          </Link>
                          <div className="px-5 pb-5">
                            <button
                              onClick={() =>
                                navigate(`/product/${newproduct?.slug}`)
                              }
                            >
                              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {truncateText(newproduct?.name, 30)}
                              </h5>
                            </button>
                            <div className="flex items-center mt-2.5 mb-5">
                              {/* Add your content here */}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                ₹{newproduct?.price}
                              </span>
                              <button
                                
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => {
                     
                                  if (newproduct) handleAddToCart(newproduct);
                                }}
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
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Productdetails;

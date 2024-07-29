import { Link } from "react-router-dom";
import axios from "axios";


import { useState, useEffect } from "react";

import{truncateText} from '../Utility/helpers';

export default function SearchSuggestion({setShowSuggestion, query }) {
  const [results, setResults] = useState({
    categories: [],
    products: [],
    
  });
  

  const renderLink = (type, id) => {
    console.log(type,id)
    switch (type) {
      case "product":
        return `/product/${id}`;
      case "category":
        return `/category/${id}`;

      default:
        return "/";
    }
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/globalSearch`, 
            {  query },
                );
            console.log(data);
        const resultdata = data.results;
        const categorizedResults = {
          categories: resultdata.filter((item) => item.type === "category"),
          products: resultdata.filter((item) => item.type === "product"),
        //   sources: resultdata.filter((item) => item.type === "source"),
        };
        setResults(categorizedResults);
      }
    };

    fetchSearchResults();
  }, [query]);

  const hasResults =  results? results?.categories?.length>0 || results?.products?.length>0 : false;
  const handleLinkClick = () => {
    setShowSuggestion(false);
  };
  return hasResults ? (
      <div className="absolute z-10 w-full bg-white border p-4 border-gray-300 mt-1 max-h-56 overflow-y-auto rounded-lg shadow-lg">
        {results.categories.length > 0 && (
          <div className="mb-4 ">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {results.categories.map((tag, index) => (
                <Link
                  to={renderLink(tag.type, tag.id)}
                  key={tag.type + tag.id + index}
                  className="inline-block bg-light-200 text-light-200 px-3 py-1 rounded-[8px]"
                >
                  #{tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        {results.categories.length > 0 && results.products.length > 0 && (
          <hr className="border-t border-gray-400 my-4" />
        )}

        {results.products.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            {results.products.map((post, index) => (
              <Link
                to={renderLink(post.type, post.id)}
                key={post.type + post.id + index}
                className="flex items-start border-0 rounded-xl gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50"
                onClick={handleLinkClick}
              >
                <img
                  src={post.image}
                  alt="search"
                  width={20}
                  height={20}
                  className="invert-colors mt-1 w-18 h-18"
                />
                <div className="flex flex-col">
                  <p className="body-medium text-dark200_light800 line-clamp-1">
                    {truncateText(post.title,32)}
                  </p>
                  {/* <p className="text-light400_light500 small-medium font-bold capitalize">
                    {post.type}
                  </p> */}
                </div>
              </Link>
            ))}

            <Link to={`/ProductGallery`} onClick={handleLinkClick}>
              <div className="flex items-center text-blue-400 mt-2 hover:underline">
                See more Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        )}
        {/* {results.sources.length > 0 &&
          (results.posts.length > 0 || results.tags.length > 0) && (
            <hr className="border-t border-gray-400 my-4" />
          )} */}

        {/* {results.sources.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Sources</h3>
            {results.sources.map((source, index) => (
              <Link
                href={renderLink(source.type, source.id)}
                key={source.type + source.id + index}
                className="flex items-start border-0 rounded-xl gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50"
              >
                <Image
                  src="/assets/database-management.png"
                  alt="source"
                  width={18}
                  height={18}
                  className="invert-colors mt-1 object-contain"
                />
                <div className="flex flex-col">
                  <p className="body-medium text-dark200_light800 line-clamp-1">
                    {source.title}
                  </p>
                  <p className="text-light400_light500 small-medium font-bold capitalize">
                    {source.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )} */}
      </div>
  ) : (
    <></>
  );
}
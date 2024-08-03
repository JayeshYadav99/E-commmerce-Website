import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000); // Countdown every second
    if (count === 0) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center text-xl font-semibold text-gray-700 mb-4">
        Redirecting you in {count} seconds
      </h1>
      <div className="flex items-center justify-center space-x-2">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>If you are not redirected automatically, click <a href={`/${path}`} className="text-blue-500 underline">here</a>.</p>
      </div>
    </div>
  );
};

export default Loader;

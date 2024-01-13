import React from "react";

import Lottie from "react-lottie";
import animationData from "../../assets/107043-success.json"
import Layout from "../../Components/Layout/Layout";
const OrderSuccessPage = () => {
  return (
    <div>
    <Layout>
      <Success />
    </Layout>
  </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
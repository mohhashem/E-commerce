import React from "react";
import HomeScene from "../Components/HomeScene/HomeScene";
import ProductContextProvider from "../Context/ProductContext";

const Home = () => {
  return (
    <ProductContextProvider>
      <HomeScene />
    </ProductContextProvider>
  );
};

export default Home;

import React from "react";
import Carousel from "../components/Carousel";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  return (
    <>
      <Carousel />
      <h1 className="text-left p-5 font-bold text-3xl text-[#cd3535]">All Products</h1>
      <ProductGrid />
    </>
  );
};

export default Home;

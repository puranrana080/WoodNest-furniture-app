import React from "react";
import Carousel from "../components/Carousel";
import ProductGrid from "../components/ProductGrid";
import { useSelector } from "react-redux";

const Home = () => {
  const { query } = useSelector((s) => s.search);

  return (
    <>
      {query ? (
        <>
          <h1 className="text-left p-5 font-bold text-3xl text-[#cd3535]">Search Products</h1>
          <ProductGrid search={query} />
        </>
      ) : (
        <>
          <Carousel />
          <h1 className="text-left p-5 font-bold text-3xl text-[#cd3535]">All Products</h1>
          <ProductGrid />
        </>
      )}
    </>
  );
};

export default Home;

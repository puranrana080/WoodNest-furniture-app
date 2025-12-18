import React from 'react'
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid"

const CategoryPage = () => {
  const { categoryName } = useParams();
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <ProductGrid category={categoryName} />
    </div>
  );
}

export default CategoryPage
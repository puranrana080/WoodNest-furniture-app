// import ProductCard from "./ProductCard";

// const ProductGrid = ({ category }) => {
//   const products = category
//     ? allProducts.filter(p => p.category === category)
//     : allProducts;

//   return (
//     <div className="grid grid-cols-4 gap-6">
//       {products.map(p => (
//         <ProductCard key={p.id} product={p} />
//       ))}
//     </div>
//   );
// };

// export default ProductGrid

import ProductCard from "./ProductCard";
import { allProducts } from "../constants/products";

const ProductGrid = ({ category }) => {

  const formattedCategory = category
    ? category.replace(/-/g, " ").toLowerCase()
    : null;

  const products = formattedCategory
    ? allProducts.filter(
        (p) => p.category.toLowerCase() === formattedCategory
      )
    : allProducts;

  return (
    <div className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
    ">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;


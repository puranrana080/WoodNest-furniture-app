import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const ProductGrid = ({ category, search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category ? `${API_BASE}/products/category/${category}` : `${API_BASE}/products`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const filteredProducts = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="
      grid gap-6
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
    ">
      {filteredProducts.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;


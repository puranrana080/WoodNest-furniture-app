import { useState } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "../constants/products";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [qty,setQty] =useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = ()=>{
    dispatch(addToCart({product,qty}))
    setQty(1);
  }

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-gray-50 p-6 rounded">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-100 object-contain"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-semibold mb-3 text-[#cd3535] ">
            {product.name}
          </h1>

          <p className="text-xl font-bold mb-4">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity</span>
            <div className="flex border rounded">
              <button onClick={()=>setQty((q)=>Math.max(1,q-1))} className="px-3 py-1 border-r">-</button>
              <span className="px-4 py-1">{qty}</span>
              <button onClick={()=>setQty((q)=>q+1)} className="px-3 py-1 border-l">+</button>
            </div>
          </div>

          {/* ADD TO CART */}
          <button onClick={handleAddToCart} className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Add {qty} to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;

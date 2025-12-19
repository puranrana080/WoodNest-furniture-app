import React from "react";
import {useDispatch} from "react-redux"
import { Link } from "react-router-dom";
import {addToCart} from "../redux/cartSlice"

const ProductCard = ({ product }) => {
   const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition duration-300 border m-4">
      
      {/* IMAGE */}
      <Link to={`/product/${product.id}`} className="w-full h-64  bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-[#cd3535]">
            ₹{product.price}
          </span>

          <button onClick={()=>dispatch(addToCart({product}))} className="bg-black text-white px-3 py-1 text-sm rounded hover:bg-gray-800 transition">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

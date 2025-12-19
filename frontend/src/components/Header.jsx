import React, { useState, useEffect } from "react";
import wImage from "../assets/w11.png";
import AuthModal from "./AuthModal";
import CartDrawer from "./CartDrawer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const { isLoggedIn, user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    if (openCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCart]);
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 ">
            {/* LOGO */}
            <Link to="/">
              <img
                src={wImage}
                alt="WoodNest Logo"
                className="h-20 w-auto"
                to="/"
              />
            </Link>

            {/* SEARCH */}
            <div className="w-[45%]">
              <input
                type="text"
                placeholder="Search for furniture..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-black"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-5">
              <button
                className="relative text-black hover:text-sky-500"
                onClick={() => setOpenCart(true)}
              >
                Cart 🛒
                <span className="absolute -top-3 -right-3 bg-wood text-black text-xs px-2  bg-amber-600 rounded-full text-center ">
                  {totalQty}
                </span>
              </button>

              {/* <button
                onClick={() => setOpen(true)}
                className="border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
              >
                Login / Signup
              </button> */}
              {!isLoggedIn ? (
                <button
                  onClick={() => setOpen(true)}
                  className="border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
                >
                  Login / Signup
                </button>
              ) : (
                <button
                  onClick={() => navigate("/account/profile")}
                  className="font-semibold hover:text-wood"
                >
                  My Account
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal open={open} handleClose={() => setOpen(false)} />
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Header;

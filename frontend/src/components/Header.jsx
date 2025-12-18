import React, { useState } from "react";
import wImage from "../assets/w11.png";
import AuthModal from "./AuthModal";
import { Link } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 " >
            {/* LOGO */}
            <Link to="/">
            <img src={wImage} alt="WoodNest Logo" className="h-20 w-auto" to="/"  />
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
              <button className="relative text-black hover:text-wood">
                🛒
                <span className="absolute -top-2 -right-2 bg-wood text-black text-xs px-1 rounded-full">
                  0
                </span>
              </button>

              <button
                onClick={() => setOpen(true)}
                className="border border-black px-4 py-2 rounded-md hover:bg-black hover:text-white transition"
              >
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default Header;

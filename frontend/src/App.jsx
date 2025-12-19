import React from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import Account from "./components/Account";
import Profile from "./components/Profile";
import Orders from "./components/Orders";

const App = () => {
  const { isLoggedIn } = useSelector((s) => s.auth);
  return (
    <>
      <Header />
      <CategoryBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/account/*"
          element={isLoggedIn ? <Account /> : <Navigate to="/" />}
        >
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;

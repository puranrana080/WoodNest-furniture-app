import React from 'react'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Checkout from './pages/Checkout';

const App = () => {
  return (

    <>
    <Header/>
    <CategoryBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/category/:categoryName" element={<CategoryPage/>} />
      <Route path="/product/:id" element={<ProductDetail/>} />
      <Route path="/checkout" element={<Checkout />} />

    </Routes>
    <Footer/>


    
    </>
  )
}

export default App
import React from 'react'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage';

const App = () => {
  return (

    <>
    <Header/>
    <CategoryBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/category/:categoryName" element={<CategoryPage/>} />

    </Routes>

    
    </>
  )
}

export default App
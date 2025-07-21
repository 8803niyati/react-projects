import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import Header from './Components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<AddProduct />} />
      </Routes>
    </>
  );
};

export default App;
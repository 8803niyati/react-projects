import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <>
   <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Add-product" element={<AddProduct/>} />
        <Route path="/Edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;
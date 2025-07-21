import React, { useEffect, useState } from 'react';
import { getStorageData, setStorageData } from '../Services/LocalStroge';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getStorageData('products');
    setProducts(data);
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter(item => item.id !== id);
    setProducts(updated);
    setStorageData('products', updated);
  };

  return (
    <div className="container">
      <h2 className="mb-4">All Products</h2>
      <div className="row">
        {products.map(item => (
          <ProductCard key={item.id} product={item} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
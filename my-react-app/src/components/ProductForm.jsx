import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorageData, setStorageData } from '../Services/LocalStroge';

const ProductForm = () => {
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const data = getStorageData('products');
      const product = data.find(p => p.id === id);
      if (product) setForm(product);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getStorageData('products');

    if (id) {
      const updated = data.map(p => (p.id === id ? form : p));
      setStorageData('products', updated);
    } else {
      const newProduct = { ...form, id: Date.now().toString() };
      setStorageData('products', [...data, newProduct]);
    }

    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={form.price}
          required
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={form.image}
          required
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
      </Form.Group>
      <Button type="submit" variant="success">
        {id ? 'Update' : 'Add'} Product
      </Button>
    </Form>
  );
};

export default ProductForm;
import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Img variant="top" src={product.image} height={200} style={{ objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Price: ₹{product.price}</Card.Text>
          <div className="d-flex justify-content-between">
            <Link to={`/edit/${product.id}`}>
              <Button variant="warning">Edit</Button>
            </Link>
            <Button variant="danger" onClick={() => onDelete(product.id)}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
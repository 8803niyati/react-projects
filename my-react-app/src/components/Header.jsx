import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" className="mb-4 shadow-sm">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0vZIi0-FHPg4JTBwzI4cIUUpepMlCojZrA&s" 
            alt="Nayika"
            height="100"
          />
        </Navbar.Brand>
        <Link to="/add">
          <Button variant="primary">Add Product</Button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
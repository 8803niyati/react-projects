import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/storageData";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    category: "",
    price: "",
    brand: "",
    image: "",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Title is required.";
    if (!inputForm.price || Number(inputForm.price) <= 0)
      newErrors.price = "Valid price is required.";
    if (!inputForm.category || inputForm.category === "Select Category")
      newErrors.category = "Please select a category.";
    if (!inputForm.brand.trim()) newErrors.brand = "Brand name is required.";
    if (!inputForm.image.trim()) {
      newErrors.image = "Image URL is required.";
    } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i.test(inputForm.image)) {
      newErrors.image = "Please enter a valid image URL ending in .jpg, .png, etc.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...inputForm, id };

    const data = getStorageData();
    data.push(newProduct);
    setStorageData(data);
    navigate("/");
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="p-5 shadow rounded bg-white" style={{ width: "100%", maxWidth: "700px" }}>
        <h2 className="text-center mb-4 text-danger">Add Product</h2>

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Title</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Price</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Category</Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                isInvalid={!!errors.category}
              >
                <option>Select Category</option>
                <option value="Makeup">Makeup</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Health & wellness">Health & wellness</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Brand</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Brand name"
                name="brand"
                value={inputForm.brand}
                onChange={handleChanged}
                isInvalid={!!errors.brand}
              />
              <Form.Control.Feedback type="invalid">{errors.brand}</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Image</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
             ></Form.Control>
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="danger" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProduct;

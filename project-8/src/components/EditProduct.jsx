import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/storageData";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    category: "Select Category",
    price: "",
    brand: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "title":
        if (!value.trim()) error = "Title is required.";
        break;
      case "brand":
        if (!value.trim()) error = "Brand is required.";
        break;
      case "price":
        if (!value || Number(value) <= 0) error = "Price must be a positive number.";
        break;
      case "category":
        if (!value || value === "Select Category") error = "Category is required.";
        break;
      case "image":
        if (!value.trim()) {
          error = "Image URL is required.";
        } else if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(value)) {
          error = "Enter a valid image URL (jpg, png, etc.).";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validate = () => {
    const newErrors = {};
    for (let field in inputForm) {
      const error = validateField(field, inputForm[field]);
      if (error) newErrors[field] = error;
    }
    return newErrors;
  };

  const handleChanged = (e) => {
    const { name, value } = e.target;

    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let data = getStorageData();
    let updatedData = data.map((prod) => (prod.id == id ? inputForm : prod));
    setStorageData(updatedData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let singleRec = data.find((product) => product.id == id);
    if (singleRec) {
      setInputForm({
        id: singleRec.id || "",
        title: singleRec.title || "",
        brand: singleRec.brand || "",
        price: singleRec.price || "",
        category: singleRec.category || "Select Category",
        image: singleRec.image || "",
      });
    }
  }, [id]);
  

  return (
    
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="p-5 shadow rounded bg-white"
        style={{ width: "100%", maxWidth: "700px" }}
      >
        <h2 className="text-center mb-4 text-danger">Edit Product</h2>

        <Form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Title</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Brand */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Brand</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="brand"
                value={inputForm.brand}
                onChange={handleChanged}
                isInvalid={!!errors.brand}
              />
              <Form.Control.Feedback type="invalid">
                {errors.brand}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Price */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Price</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Category */}
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
                <option value="Mekeup">Mekeup</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Health & wellness">Health & wellness</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Image */}
          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Image</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Submit */}
          <div className="text-center">
            <Button variant="danger" type="submit">
              Update Product
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditProduct;

import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/storageData";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import "../App.css"; 

const Home = () => {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortData, setSortData] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    let data = getStorageData() || [];
    setProductData(data);
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    let data = getStorageData();
    let updateData = data.filter(product => product.id !== id);
    setStorageData(updateData);
    setProductData(updateData);
  };

  const handleSearch = () => {
    let data = getStorageData();
    let updateData = data.filter(prod =>
      prod.title.toLowerCase().includes(search.toLowerCase()) ||
      prod.category.toLowerCase().includes(search.toLowerCase()) ||
      prod.price.toString() === search
    );
    setProductData(updateData);
    setSearch("");
  };

  const handleClear = () => {
    let data = getStorageData();
    setProductData(data);
    setSearch("");
    setSortData("");
    setCategoryFilter("All");
  };

  const handleSorting = () => {
    let data = [...productData];
    let [field, type] = sortData.split(",");

    if (type === "asc" && field !== "price") {
      data.sort((a, b) => a[field].localeCompare(b[field]));
    } else if (type === "asc" && field === "price") {
      data.sort((a, b) => a[field] - b[field]);
    } else if (type === "desc" && field !== "price") {
      data.sort((a, b) => b[field].localeCompare(a[field]));
    } else if (type === "desc" && field === "price") {
      data.sort((a, b) => b[field] - a[field]);
    }

    setProductData(data);
  };

  const handleFilter = () => {
    let data = getStorageData();
    if (categoryFilter === "All") {
      setProductData(data);
    } else {
      const filtered = data.filter((prod) => prod.category === categoryFilter);
      setProductData(filtered);
    }
  };

  // Pagination Logic
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(productData.slice(itemOffset, endOffset));
  }, [itemOffset, productData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productData.length;
    setItemOffset(newOffset);
  };

  const allCategories = ["All", ...new Set(getStorageData().map(p => p.category))];

  return (
    <>
      <h1 className="text-center mt-3">Home</h1>

      {/* 🔍 Search, Sort, Filter */}
      <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center my-3 sort-container">
        <Form.Control
          type="text"
          name="search"
          placeholder="Search by title, category, price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "250px" }}
        />
        <Button variant="primary" onClick={handleSearch}>Search</Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>

        <Form.Select
          value={sortData}
          onChange={(e) => setSortData(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Sort By</option>
          <option value="title,asc">Name A-Z</option>
          <option value="title,desc">Name Z-A</option>
          <option value="price,asc">Price Low-High</option>
          <option value="price,desc">Price High-Low</option>
          <option value="category,asc">Category A-Z</option>
          <option value="category,desc">Category Z-A</option>
        </Form.Select>
        <Button variant="success" onClick={handleSorting}>Sort</Button>

        <Form.Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </Form.Select>
        <Button variant="info" onClick={handleFilter}>Filter</Button>
      </div>

      {/* 📦 Product Cards */}
      <div className="d-flex flex-wrap justify-content-center">
        {currentItems.length === 0 ? (
          <h5 className="text-danger">No Products Found</h5>
        ) : (
          currentItems.map((product) => (
            <Card style={{ width: "18rem", margin: "10px" }} key={product.id}>
              <Card.Img variant="top" src={product.image} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{product.title} - {product.id}</Card.Title>
                <Card.Text>{product.desc}</Card.Text>
                <Card.Text>Price: <strong>{product.price}</strong></Card.Text>
                <Badge bg="warning">{product.category}</Badge>
                <br /><br />
                <Button onClick={() => handleEdit(product.id)} variant="warning">Edit</Button>{" "}
                <Button onClick={() => handleDelete(product.id)} variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* 🔁 Pagination */}
      {productData.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(productData.length / itemsPerPage)}
            previousLabel="< Prev"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      )}
    </>
  );
};

export default Home;

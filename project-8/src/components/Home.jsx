// import { useEffect, useState } from "react";
// import { getStorageData, setStorageData } from "../Services/storageData";
// import { Badge, Button, Card, Container } from "react-bootstrap";
// import { useNavigate } from "react-router";
// import ReactPaginate from "react-paginate";
// import '../App.css';

// const Home = () => {
//   const [productData, setProductData] = useState([]);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [itemOffset, setItemOffset] = useState(0);
//   const itemsPerPage = 5;

//   const navigate = useNavigate();

//   useEffect(() => {
//     let data = getStorageData() || [];
//     setProductData(data);
//   }, []);

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(productData.slice(itemOffset, endOffset));
//   }, [itemOffset, productData]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % productData.length;
//     setItemOffset(newOffset);
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit-product/${id}`);
//   };

//   const handleDelete = (id) => {
//     let data = getStorageData();
//     let updateData = data.filter(product => product.id !== id);
//     setStorageData(updateData);
//     setProductData(updateData);
//   };

//   return (
//     <>
//       <div className="container">
//         <h1 className="text-center mt-4">Home</h1>
//       </div>

//       <Container className="mt-5">
//         <div className="row g-4">
//           {currentItems.map((product) => (
//             <div key={product.id} className="col-md-6 col-lg-4">
//               <Card className="border-0 shadow rounded-4 card-hover h-100 d-flex flex-column">
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   className="rounded-top-4"
//                   style={{ height: "300px", objectFit: "cover" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <div className="flex-grow-1">
//                     <Card.Title className="fw-bold fs-5">
//                       {product.title}{" "}
//                       <span className="text-muted small">#{product.id}</span>
//                     </Card.Title>
//                     <Card.Text
//                       className="mb-2"
//                       style={{ color: "rgba(226, 31, 135, 1)", fontSize: "0.95rem", fontWeight: "500" }}
//                     >
//                       <strong style={{ color: "#333" }}>Brand:</strong> {product.brand}
//                     </Card.Text>
//                     <span
//                       className="mb-3 d-inline-block"
//                       style={{
//                         backgroundColor: "#9737e1ff",
//                         color: "#fff",
//                         padding: "4px 10px",
//                         borderRadius: "12px",
//                         fontSize: "0.85rem",
//                         fontWeight: "500"
//                       }}
//                     >
//                       {product.category}
//                     </span>
//                   </div>

//                   <div className="d-flex justify-content-between mt-auto pt-3 me-4 ms-4">
//                     <Button
//                       style={{ backgroundColor: "#f27d08ff", borderColor: "#fc8eac" }}
//                       size="sm"
//                       onClick={() => handleEdit(product.id)}
//                     >
//                       Edit
//                     </Button>

//                     <Button
//                       style={{ backgroundColor: "#e80756ff", borderColor: "#A94064" }}
//                       size="sm"
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-4">
//           <ReactPaginate
//             breakLabel="..."
//             nextLabel="Next >"
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={3}
//             pageCount={Math.ceil(productData.length / itemsPerPage)}
//             previousLabel="< Prev"
//             containerClassName="pagination"
//             pageClassName="page-item"
//             pageLinkClassName="page-link"
//             previousClassName="page-item"
//             previousLinkClassName="page-link"
//             nextClassName="page-item"
//             nextLinkClassName="page-link"
//             activeClassName="active"
//           />
//         </div>
//       </Container>
//     </>
//   );
// };

// export default Home;

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

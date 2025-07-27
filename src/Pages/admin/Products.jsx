import React, { useRef } from "react";
import ProductList from "./../../Components/Admin/ProductList";
import "./../../Css/adminproducts.css";

function Products() {
  const containerRef = useRef(null);

  return (
    <div className="product-container" ref={containerRef}>
      <ProductList />
    </div>
  );
}

export default Products;
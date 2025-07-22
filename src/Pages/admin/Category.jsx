import React, { useRef } from 'react';
import CategoryList from './../../Components/Admin/CategoryList';
import "./../../Css/admincategory.css";

function Category() {
  const containerRef = useRef(null);

  return (
    <div className="category-container" ref={containerRef}>
      <CategoryList containerRef={containerRef} />
    </div>
  );
}

export default Category;
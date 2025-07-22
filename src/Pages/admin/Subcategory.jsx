import React, { useRef } from 'react';
import SubcategoryList from './../../Components/Admin/SubcategoryList';
import "./../../Css/adminsubcategory.css";

function Subcategory() {
  const containerRef = useRef(null);

  return (
    <div className="subcategory-container" ref={containerRef}>
      <SubcategoryList containerRef={containerRef} />
    </div>
  );
}

export default Subcategory;
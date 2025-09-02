import React, { useState, useEffect } from "react";
import "./Instagram.css";
import { ProductTypes } from "./../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";
import { Link } from "react-router-dom";

const Instagram = () => {
  const [products, setProducts] = useState([]);
  
    const loadProducts = () => ProductTypes({types: ['showInGallery']}).then((res) => {
          setProducts(res?.data)
        });
        
    useEffect(() => {
      loadProducts();
    }, []);
  return (
    <>
      <div className="instagram">
      <h2>Collections For Your Loved</h2>
      <div className="instagramTiles">
        {products.length > 0 &&
          products.map((product) => (
            <div className="instagramtile" key={product.id}>
              {/* ✅ backticks use karo */}
              <Link to={`/shop/${product.id}`}>
                <img
                  src={getImageUrl(product?.images[0])}
                  alt={product?.name || "product"}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default Instagram;

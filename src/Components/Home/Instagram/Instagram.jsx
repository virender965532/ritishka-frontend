import React, { useState, useEffect } from "react";
import "./Instagram.css";
import { ProductTypes } from "./../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";

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
          {
            products.length > 0 &&  products.map((product) => {
              return (
                <>
                  <div className="instagramtile">
                    <img src={getImageUrl(product?.images[0])} alt="" />
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default Instagram;

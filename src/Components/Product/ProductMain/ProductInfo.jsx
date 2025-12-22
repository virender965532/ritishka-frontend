import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";

const ProductInfo = ({ product, highlightedColor, setHighlightedColor }) => {
  return (
    <div className="productDetails">
      <div className="productName">
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{product?.brand || ''}</h1>
        <h2>{product?.title || ''}</h2>
      </div>
      <div className="productPrice">
        <h3>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.price)}</h3>
      </div>
      <div className="productDescription">
        <p>{product?.shortDescription  || ''}</p>
      </div>
      <div className="productDescription">
        <p>{product?.description  || ''}</p>
      </div>
      <div className="productSizeColor">
        <div className="productColor">
          <p>Color</p>
          <div className="colorBtn">
            {product?.colors?.map((color) => (
              <Tooltip
                key={color}
                placement="top"
                enterTouchDelay={0}
                TransitionComponent={Zoom}
                arrow
              >
                <button
                  className={
                    highlightedColor === color ? "highlighted" : ""
                  }
                  style={{
                    backgroundColor: color.toLowerCase(),
                    margin: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => setHighlightedColor(color)}
                />
              </Tooltip>
            ))}
          </div>
          <div className="selectedColorLabel">
            <span style={{ color: "#7c6f57", fontWeight: 700 }}>Selected:</span>
            <span style={{ marginLeft: 10, display: "inline-flex", alignItems: "center", gap:8 }}>
              <span style={{ width: 18, height: 18, borderRadius: 10, background: (highlightedColor || "transparent").toLowerCase(), border: "1px solid rgba(0,0,0,0.06)" }} />
              <strong style={{ color: "#2b2418" }}>{highlightedColor || "Default"}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="productTags">
        <p><span>CATEGORIES:</span><span className="metaValue">{product?.category?.name || 'N/A'}</span></p>
        <p><span>SUB-CATEGORIES:</span><span className="metaValue">{product?.subcategory?.name || 'N/A'}</span></p>
        <p><span>TAGS:</span><span className="metaValue">{product?.tags?.length > 0 ? product?.tags.map((el) => el?.name).join(', ') : 'N/A'}</span></p>
      </div>
    </div>
  );
};

export default ProductInfo;

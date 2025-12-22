import React from "react";
import { getImageUrl } from "../../../utils/imageUtils";
import "./ProductCard.css";

const ProductCard = ({ product, wishlistEntry, onRemove, onAddToCart }) => {
  const img = product?.images && product.images[0] ? getImageUrl(product.images[0]) : "#";
  const color = wishlistEntry?.color || wishlistEntry?.highlightedColor || null;

  return (
    <div className="jewel-card">
      <div className="jewel-card-img">
        <img src={img} alt={product?.title} />
      </div>
      <div className="jewel-card-body">
        <h4 className="jewel-card-title">{product?.title}</h4>
        <p className="jewel-card-price">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.price)}</p>
        {color && (
          <div className="jewel-card-color">Color: <span style={{background: color, display:'inline-block', width:16, height:16, borderRadius:8, marginLeft:8}} /></div>
        )}
      </div>
      <div className="jewel-card-actions">
        <button className="jewel-btn remove" onClick={() => onRemove(wishlistEntry?._id || wishlistEntry?.product_id)}>Remove</button>
        <button className="jewel-btn add" onClick={() => onAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

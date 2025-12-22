import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart  } from "react-icons/ai";

const ProductActions = ({ wishlistAdded, cartAdded, handleWishClick, handleAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(500, q + 1));

  const onAdd = () => handleAddToCart(quantity);

  return (
    <div className="productWishShare">
      <div className="productWishList">
        {wishlistAdded ? (
          <button onClick={handleWishClick}>
            <AiFillHeart color="red" size={17} />
            <p>Remove From Wishlist</p>
          </button>
        ) : (
          <button onClick={handleWishClick}>
            <FiHeart color={"black"} size={17} />
            <p>Add To Wishlist</p>
          </button>
        )}
      </div>

      <div className="productQuantityControl">
        <div className="quantityLabel">Quantity</div>
        <div className="quantityBox">
          <button className="qty-btn" onClick={dec}>-</button>
          <input className="qty-input" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} />
          <button className="qty-btn" onClick={inc}>+</button>
        </div>
      </div>

      <div className="productCartBtn">
        <button onClick={onAdd}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductActions;

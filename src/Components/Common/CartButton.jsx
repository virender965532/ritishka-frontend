import React from "react";

const CartButton = ({ onClick, children = "Add to Cart", className = "", disabled = false, style = {} }) => {
  return (
    <button className={"cart-button " + className} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

export default CartButton;

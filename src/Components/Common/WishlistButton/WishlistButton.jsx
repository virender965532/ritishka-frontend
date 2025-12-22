import React, { useState, useEffect } from 'react';
import './WishlistButton.css';
import { FiHeart } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai';
import useWishlist from '../../../customHooks/useWishlist';
import { useSelector } from 'react-redux';

const WishlistButton = ({ product, productId, size = 18, className = '', style = {} }) => {
  const { toggleWishlist } = useWishlist();
  const wishlistData = useSelector((state) => state?.wishlistData) || [];
  const id = product?._id || productId;
  const [localState, setLocalState] = useState(() => !!wishlistData.find(i => i.product_id === id));

  useEffect(() => {
    setLocalState(!!wishlistData.find(i => i.product_id === id));
  }, [wishlistData, id]);

  const handleClick = async (e) => {
    e && e.stopPropagation();
    const res = toggleWishlist(product || id);
    if (res !== null) setLocalState(!!res);
  };

  return (
    <button
      type="button"
      className={`wb-button ${className}`}
      onClick={handleClick}
      aria-pressed={localState}
      style={style}
    >
      {localState ? (
        <AiFillHeart size={size} color="red" className="wb-icon" />
      ) : (
        <FiHeart size={size} color="#767676" className="wb-icon" />
      )}
    </button>
  );
};

export default WishlistButton;

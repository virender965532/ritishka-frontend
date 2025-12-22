import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../api/api";
import ProductCard from "../Product/ProductMain/ProductCard";
import useWishlist from "../../customHooks/useWishlist";
import useCart from "../../customHooks/useCart";
import "./Wishlist.css";

const GOLD = "#b18b47";

const Wishlist = () => {
  const wishlistData = useSelector((state) => state?.wishlistData) || [];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((res) => {
        setProducts(res?.data?.products || res?.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const mapped = (wishlistData || []).map((w) => {
    const product = (products || []).find((p) => p._id === w.product_id) || null;
    return { wishlist: w, product };
  }).filter(item => item.product);

  return (
    <div className="wishlist-page">
        <div className="jewel-wishlist-page">
        <div className="jewel-wishlist-header">
            <h1 style={{ color: GOLD }}>Your Wishlist</h1>
            <p>Beautiful picks saved for you. Tap to shop or remove anytime.</p>
        </div>
        <div className="jewel-wishlist-body">
            {loading && <p>Loading...</p>}
            {!loading && mapped.length === 0 && <p className="empty">Your wishlist is empty.</p>}
            <div className="jewel-wishlist-grid">
            {mapped.map(({ wishlist, product }) => (
                <ProductCard
                key={wishlist._id || wishlist.product_id}
                product={product}
                wishlistEntry={wishlist}
                onRemove={() => removeFromWishlist(wishlist.product_id)}
                onAddToCart={(p) => addToCart(p)}
                />
            ))}
            </div>
        </div>
        </div>
    </div>
  );
};

export default Wishlist;

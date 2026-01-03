import React, { useState, useEffect, useMemo } from "react";
import "./ShoppingCart.css";
import useCart from "../../customHooks/useCart";
import ShoppingCartTabs from "../ShoppingCart/ShoppingCartTabs";
import ShoppingCartTab1 from "../ShoppingCart/ShoppingCartTab1";
import { useSelector } from "react-redux";
import { fetchProducts as apiFetchProducts } from "../../api/api";

const ShoppingCart = () => {
  const {removeFromCart: removeCartItem, updateQuantity: updateCartQuantity } = useCart();
  const cartData = useSelector((state) => state.cartData);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await apiFetchProducts();
        const data = res?.data?.products || [];
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        if (!cancelled) setLoadingProducts(false);
      }
    };

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const cartItems = useMemo(() => {
    if (!Array.isArray(cartData) || products?.length === 0) return [];
    return cartData.map((c) => {
      const id = c?.product_id;
      const product = products.find((p) => p?._id === id) || {};
      return {
        ...product,
        quantity: c.quantity || 1,
        color: c.color || null,
      };
    });
  }, [products, cartData]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0 && products.length > 0) {
      let total = 0;
      let discounted = 0;
      cartItems.forEach((item) => {
        total += (item?.price || 0) * (item?.quantity || 0);
        discounted += (item?.discountedPrice || 0) * (item?.quantity || 0);
      });
      setLocalCartItems(cartItems);
      setTotalPrice(total);
      setDiscountedPrice(discounted);
    } else {
      setLocalCartItems([]);
      setTotalPrice(0);
      setDiscountedPrice(0);
    }
  }, [cartItems, products]);

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) setActiveTab(tab);
  };

  const handleQuantityChange = (_id, quantity) => {
    if (quantity >= 1 && quantity <= 100) {
      updateCartQuantity(_id, quantity);
    }
  };

  const removeItem = (id) => {
    removeCartItem(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="items-center justify-center gap-6 text-2xl font-black text-[#7c5e10] mt-6">
        CART
      </h2>
      <div className="shoppingCartTabsContainer">
        <ShoppingCartTabs
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          cartItems={localCartItems}
          payments={payments}
        />

        <div className="shoppingCartTabsContent">
          <ShoppingCartTab1
            cartItems={cartItems}
            totalPrice={totalPrice}
            discountedPrice={discountedPrice}
            handleQuantityChange={handleQuantityChange}
            removeItem={removeItem}
            handleTabClick={handleTabClick}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

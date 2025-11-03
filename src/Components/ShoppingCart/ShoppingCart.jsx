import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import useCart from "../../customHooks/useCart";
import ShoppingCartTabs from "../ShoppingCart/ShoppingCartTabs";
import ShoppingCartTab1 from "../ShoppingCart/ShoppingCartTab1";
import success from "../../Assets/success.png";

const ShoppingCart = () => {
  const { cartItems, removeFromCart: removeCartItem, updateQuantity: updateCartQuantity } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems || []);
  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(
    "Direct Bank Transfer"
  );

  useEffect(() => {
    if (cartItems) {
      let total = 0;
      let discounted = 0;
      cartItems.forEach((item) => {
        total += item?.price * item?.quantity;
        discounted += item?.discountedPrice * item?.quantity;
      });
      setLocalCartItems(cartItems);
      setTotalPrice(total);
      setDiscountedPrice(discounted);
    }
  }, [cartItems]);

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) setActiveTab(tab);
  };

  const handleQuantityChange = (_id, quantity) => {
    if (quantity >= 1 && quantity <= 20) {
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

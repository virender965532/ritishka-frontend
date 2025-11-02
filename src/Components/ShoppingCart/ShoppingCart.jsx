import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../Features/Cart/cartSlice";
import ShoppingCartTabs from "../ShoppingCart/ShoppingCartTabs";
import ShoppingCartTab1 from "../ShoppingCart/ShoppingCartTab1";
import ShoppingCartTab2 from "../ShoppingCart/ShoppingCartTab2";
import ShoppingCartTab3 from "../ShoppingCart/ShoppingCartTab3";
import success from "../../Assets/success.png";

const ShoppingCart = () => {
  const cartData = useSelector((state) => state?.cartData);
  const [cartItems, setCartItems] = useState(cartData || []);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab1");
  const [payments, setPayments] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(
    "Direct Bank Transfer"
  );

  useEffect(() => {
    if (cartData) {
      let total = 0;
      let discounted = 0;
      cartData.forEach((item) => {
        total += item?.price * item?.quantity;
        discounted += item?.discountedPrice * item?.quantity;
      });
      setCartItems(cartData);
      setTotalPrice(total);
      setDiscountedPrice(discounted);
    }
  }, [cartData]);

  const handleTabClick = (tab) => {
    if (tab === "cartTab1" || cartItems.length > 0) setActiveTab(tab);
  };

  const handleQuantityChange = (_id, quantity) => {
    if (quantity >= 1 && quantity <= 20) {
      dispatch(updateQuantity({ _id, quantity }));
    }
  };

  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);
  const removeItem = (id) => dispatch(removeFromCart(id));

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
          cartItems={cartItems}
          payments={payments}
        />

        <div className="shoppingCartTabsContent">
          {activeTab === "cartTab1" && (
            <ShoppingCartTab1
              cartItems={cartItems}
              totalPrice={totalPrice}
              discountedPrice={discountedPrice}
              handleQuantityChange={handleQuantityChange}
              removeItem={removeItem}
              handleTabClick={handleTabClick}
              scrollToTop={scrollToTop}
            />
          )}

          {activeTab === "cartTab2" && (
            <ShoppingCartTab2
              cartItems={cartItems}
              totalPrice={totalPrice}
              handleTabClick={handleTabClick}
              setPayments={setPayments}
              selectedPayment={selectedPayment}
              handlePaymentChange={handlePaymentChange}
              scrollToTop={scrollToTop}
            />
          )}

          {activeTab === "cartTab3" && (
            <ShoppingCartTab3
              cartItems={cartItems}
              totalPrice={totalPrice}
              selectedPayment={selectedPayment}
              success={success}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

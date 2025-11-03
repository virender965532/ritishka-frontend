import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartTabs from "../ShoppingCart/ShoppingCartTabs";
import ShoppingCartTab2 from "../ShoppingCart/ShoppingCartTab2";

const Checkout = () => {
  const cartData = useSelector((state) => state?.cartData);
  const [cartItems, setCartItems] = useState(cartData || []);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab2");
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

  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);

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
          <ShoppingCartTab2
            cartItems={cartItems}
            totalPrice={totalPrice}
            handleTabClick={handleTabClick}
            setPayments={setPayments}
            selectedPayment={selectedPayment}
            handlePaymentChange={handlePaymentChange}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

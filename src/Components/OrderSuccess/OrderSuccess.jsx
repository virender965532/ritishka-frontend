import React, { useState, useEffect } from "react";
// import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartTabs from "../ShoppingCart/ShoppingCartTabs";
import ShoppingCartTab3 from "../ShoppingCart/ShoppingCartTab3";
import success from "../../Assets/success.png";

const OrderSuccess = () => {
  const cartData = useSelector((state) => state?.cartData);
  const [cartItems, setCartItems] = useState(cartData || []);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("cartTab3");
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
    setActiveTab(tab);
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
            <ShoppingCartTab3
                cartItems={cartItems}
                totalPrice={totalPrice}
                selectedPayment={selectedPayment}
                success={success}
            />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

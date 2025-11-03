import React from "react";

const ShoppingCartTabs = ({
  activeTab,
  handleTabClick,
  cartItems,
  payments,
}) => {
  const redirectToCheckout = () => {
    window.location.href = "/checkout";
  }
  const redirectToCart = () => {
    window.location.href = "/cart";
  }
  const redirectToConfirmation = () => {
    window.location.href = "/order/success";
  }
  return (
    <div className={`shoppingCartTabs ${activeTab}`}>
      <button
        className={activeTab === "cartTab1" ? "active" : ""}
        onClick={redirectToCart}
      >
        <div className="shoppingCartTabsHeading">
          <h3 className="flex flex-row relative opacity-100 font-extrabold items-center justify-start text-xl">
            Shopping Bag
          </h3>
          <p className="flex flex-row relative opacity-100 font-medium items-center justify-start text-xs">
            Manage Your Items List
          </p>
        </div>
      </button>

      <button
        className={activeTab === "cartTab2" ? "active" : ""}
        disabled={false}
        onClick={redirectToCheckout}
      >
        <div className="shoppingCartTabsHeading">
          <h3 className="flex flex-row relative opacity-100 font-extrabold items-center justify-start text-xl">
            Shipping and Checkout
          </h3>
          <p className="flex flex-row relative opacity-100 font-medium items-center justify-start text-xs">
            Checkout Your Items List
          </p>
        </div>
      </button>

      <button
        className={activeTab === "cartTab3" ? "active" : ""}
        disabled={false}
        onClick={redirectToConfirmation}
      >
        <div className="shoppingCartTabsHeading">
          <h3 className="flex flex-row relative opacity-100 font-extrabold items-center justify-start text-xl">
            Confirmation
          </h3>
          <p className="flex flex-row relative opacity-100 font-medium items-center justify-start text-xs">
            Review And Submit Your Order
          </p>
        </div>
      </button>
    </div>
  );
};

export default ShoppingCartTabs;

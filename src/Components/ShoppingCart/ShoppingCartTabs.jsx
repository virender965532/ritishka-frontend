import React from "react";

const ShoppingCartTabs = ({
  activeTab,
  handleTabClick,
  cartItems,
  payments,
}) => {
  return (
    <div className={`shoppingCartTabs ${activeTab}`}>
      <button
        className={activeTab === "cartTab1" ? "active" : ""}
        onClick={() => handleTabClick("cartTab1")}
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
        onClick={() => handleTabClick("cartTab2")}
        disabled={cartItems.length === 0}
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
        onClick={() => handleTabClick("cartTab3")}
        disabled={cartItems.length === 0 || payments === false}
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

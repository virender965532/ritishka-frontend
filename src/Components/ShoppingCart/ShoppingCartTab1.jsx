import React from "react";
import ShoppingBagDesktop from "./ShoppingBagDesktop";
import ShoppingBagMobile from "./ShoppingBagMobile";
import CartTotals from "./CartTotals";
import Box from "@mui/material/Box";

const ShoppingCartTab1 = ({
  cartItems,
  totalPrice,
  handleQuantityChange,
  removeItem = () => {},
  handleTabClick,
  scrollToTop,
  discountedPrice,
}) => {
  const handleProceedToCheckout = () => {
    redirectToCheckout();
  }
  const redirectToCheckout = () => {
    window.location.href = "/checkout";
  }
  return (
    <div className="shoppingBagSection">
      <div className="shoppingBagTableSection">
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <ShoppingBagDesktop
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            removeItem={removeItem}
            scrollToTop={scrollToTop}
          />
        </Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <ShoppingBagMobile
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            removeItem={removeItem}
            scrollToTop={scrollToTop}
          />
        </Box>
      </div>

      <div className="flex flex-col gap-6 mb-6 w-[30%] sm:w-[100%] md:w-[40%] lg:w-[30%] h-[400px] h-full">
        <CartTotals
          totalPrice={totalPrice}
          cartItems={cartItems}
          handleTabClick={handleTabClick}
          discountedPrice={discountedPrice}
          handleProceedToCheckout={handleProceedToCheckout}
        />
      </div>
    </div>
  );
};

export default ShoppingCartTab1;

import React from "react";
import {
  CART_SHIPPING_AMOUNT,
  CART_GST_PERCENTAGE,
} from "../../Constants/Constants";

const CartTotals = ({
  totalPrice,
  cartItems,
  hideCheckoutButton = false,
  discountedPrice = 0,
  handleProceedToCheckout,
}) => {
  const isCartPage = window?.location?.pathname === "/cart";
  return (
    <div className="shoppingBagTotal !w-full h-auto flex flex-col gap-4 relative p-4 border-[#7c5e10] rounded-md border-[3px] bg-[#fffbe9] text-[#7c5e10]">
      <h3 className="flex flex-row items-center justify-between text-lg font-semibold">
        Cart Totals
      </h3>
      <table className="shoppingBagTotalTable">
        <tbody>
          <tr>
            <th>MRP</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice)}
            </td>
          </tr>
          <tr>
            <th>Discount</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice - discountedPrice)}
            </td>
          </tr>
          <tr>
            <th>After Discount</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(discountedPrice)}
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              {CART_SHIPPING_AMOUNT == 0 ? (
                <>
                <span className="text-xs">Free Delivery</span>
                </>
              ) : (new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(CART_SHIPPING_AMOUNT))}
            </td>
          </tr>
          <tr>
            <th>VAT / GST ({CART_GST_PERCENTAGE}%)</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(discountedPrice - (discountedPrice * (100 / (100+CART_GST_PERCENTAGE))))}
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(
                totalPrice === 0
                  ? 0
                  : discountedPrice +
                      CART_SHIPPING_AMOUNT)}
            </td>
          </tr>
        </tbody>
      </table>
      {isCartPage && (
        <button
          className="relative w-[95%] bottom-4 left-1/2 transform -translate-x-1/2 bg-[#7c5e10] text-white px-6 py-2 rounded-md hover:bg-[#5a450c] disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleProceedToCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartTotals;

import React from "react";
import {
  CART_SHIPPING_AMOUNT,
  CART_GST_PERCENTAGE,
} from "../../Constants/Constants";

const CartTotals = ({
  totalPrice,
  cartItems,
  handleTabClick,
  hideCheckoutButton = false,
}) => {
  return (
    <div className="shoppingBagTotal !w-full h-[400px] flex flex-col gap-4 relative p-4 border-[#7c5e10] rounded-md border-[3px] bg-[#fffbe9] text-[#7c5e10]">
      <h3 className="flex flex-row items-center justify-between text-lg font-semibold">
        Cart Totals
      </h3>
      <table className="shoppingBagTotalTable">
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice)}
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(CART_SHIPPING_AMOUNT)}
            </td>
          </tr>
          <tr>
            <th>VAT / GST ({CART_GST_PERCENTAGE}%)</th>
            <td>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice * (CART_GST_PERCENTAGE / 100))}
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
                  : totalPrice +
                      CART_SHIPPING_AMOUNT +
                      totalPrice * (CART_GST_PERCENTAGE / 100)
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {!hideCheckoutButton && (
        <button
          className="absolute w-[80%] bottom-4 left-1/2 transform -translate-x-1/2 bg-[#7c5e10] text-white px-6 py-2 rounded-md hover:bg-[#5a450c] disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={() => {
            handleTabClick("cartTab2");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartTotals;

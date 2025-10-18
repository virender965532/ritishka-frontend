import React from "react";
import { Link } from "react-router-dom";
import CartTotals from "./CartTotals";

const ShoppingCartTab2 = ({
  cartItems,
  totalPrice,
  handleTabClick,
  setPayments,
  selectedPayment,
  handlePaymentChange,
  scrollToTop,
}) => {
  return (
    <div className="checkoutSection !w-full flex flex-col sm:flex-row gap-6 !max-w-7xl">
      <div className="checkoutDetailsSection">
        <h4>Billing Details</h4>
        <form className="checkoutDetailsForm flex flex-col gap-4 mt-4 !w-full !max-w-7xl">
          {/* <div className="checkoutDetailsFormRow">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="text" placeholder="Company Name (optional)" />
          <select>
            <option disabled selected>
              Country / Region
            </option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
          <input type="text" placeholder="Street Address *" />
          <input type="text" placeholder="Town / City *" />
          <input type="text" placeholder="Postcode / ZIP *" />
          <input type="text" placeholder="Phone *" />
          <input type="mail" placeholder="Email *" /> */}
          {/* First + Last Name */}
          <div className="checkoutDetailsFormRow grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            <input
              type="text"
              placeholder="Last Name *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Company Name (optional)"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Country / Region */}
          <div className="mb-4">
            <select
              defaultValue=""
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            >
              <option value="" disabled>
                Country / Region *
              </option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          {/* Street Address */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Street Address *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Town / City */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Town / City *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Postcode / ZIP */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Postcode / ZIP *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email *"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>
        </form>
      </div>

      <div className="checkoutPaymentSection">
        <div className="flex flex-col gap-6 mb-6 !w-full h-[300px]">
          <CartTotals
            totalPrice={totalPrice}
            cartItems={cartItems}
            handleTabClick={handleTabClick}
            hideCheckoutButton={true}
          />
        </div>

        <div className="checkoutPaymentContainer">
          {[
            "Direct Bank Transfer",
            "Check Payments",
            "Cash on delivery",
            "Paypal",
          ].map((method) => (
            <label key={method}>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={selectedPayment === method}
                onChange={handlePaymentChange}
              />
              <span>{method}</span>
            </label>
          ))}
          <div className="policyText">
            Your data will be used as per our{" "}
            <Link to="/terms" onClick={scrollToTop}>
              Privacy Policy
            </Link>
            .
          </div>
        </div>

        <button
          onClick={() => {
            handleTabClick("cartTab3");
            setPayments(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartTab2;

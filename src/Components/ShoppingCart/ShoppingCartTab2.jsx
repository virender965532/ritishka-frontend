import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartTotals from "./CartTotals";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const ShoppingCartTab2 = ({
  cartItems,
  totalPrice,
  handleTabClick,
  setPayments,
  selectedPayment,
  handlePaymentChange,
  scrollToTop,
  discountedPrice,
}) => {
  const navigate = useNavigate();

  // Billing form state
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [billingSubmitted, setBillingSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const { error, isLoading, Razorpay } = useRazorpay();


  // Ensure default payment selection is Online Payment
  useEffect(() => {
    if ((!selectedPayment || selectedPayment === "") && typeof handlePaymentChange === "function") {
      // create a synthetic event object to set default
      handlePaymentChange({ target: { value: "Online Payment" } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    const e = {};
    if (!billing.firstName.trim()) e.firstName = "First name is required";
    if (!billing.lastName.trim()) e.lastName = "Last name is required";
    if (!billing.country) e.country = "Country is required";
    if (!billing.street.trim()) e.street = "Street address is required";
    if (!billing.city.trim()) e.city = "City is required";
    if (!billing.postcode.trim()) e.postcode = "Postcode / ZIP is required";
    if (!billing.phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{6,15}$/.test(billing.phone.trim())) e.phone = "Enter a valid phone number";
    if (!billing.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email.trim())) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Helper to load razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleBillingChange = (field) => (e) => {
    setBilling((s) => ({ ...s, [field]: e.target.value }));
  };

  const handleBillingSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // COMMENTED OUT: submit billing details to backend (backend not ready)
      // await api.submitBillingDetails(billing);
      console.log("Billing data to submit (commented):", billing);

      // Mark billing as submitted which will enable payment section
      setBillingSubmitted(true);
      // Scroll to top where payment section is (keeps the UX similar)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // handle exceptions gracefully
      console.error("Error submitting billing details:", err);
      setErrors({ form: "Unable to save billing details. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    setPaymentProcessing(true);
    // const options = {
    //     key: "rzp_test_RbKxQcjvVldXzY", // dummy test key
    //     amount: Math.round((100 || 0) * 100), // amount in paise
    //     currency: "INR",
    //     name: "Ritishka Silver",
    //     description: "Order Payment",
    //     // order_id: "dummy_order_id", // normally from backend
    //     handler: function (response) {
    //       console.log("Razorpay success:", response);
    //       // On success, navigate to order success
    //       // In production you would verify signature and capture the payment on server
    //       window.location.href = "/order/success";
    //     },
    //     prefill: {
    //       name: `${billing.firstName} ${billing.lastName}`,
    //       email: billing.email,
    //       contact: billing.phone,
    //     },
    //     notes: {
    //       address: billing.street + ", " + billing.city,
    //     },
    //     theme: {
    //       color: "#bfa046",
    //     },
    //   };
    {
    const options = {
      key: "rzp_test_RbKxQcjvVIdXzY", // dummy test key
      amount: Math.round((100 || 0) * 100), // amount in paise
      currency: "INR",
      name: "Ritishka Silver",
      description: "Order Payment",
      // order_id: "dummy_order_id", // normally from backend
      handler: function (response) {
        console.log("Razorpay success:", response);
        // On success, navigate to order success
        // In production you would verify signature and capture the payment on server
        window.location.href = "/order/success";
      },
      prefill: {
        name: `${billing.firstName} ${billing.lastName}`,
        email: billing.email,
        contact: billing.phone,
      },
      notes: {
        address: billing.street + ", " + billing.city,
      },
      theme: {
        color: "#bfa046",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };
  };

  const handleCTA = () => {
    // If COD selected
    if (selectedPayment === "Cash on delivery") {
      // COMMENTED OUT: place order API when backend ready
      // await api.placeOrder({ billing, paymentMethod: 'COD' })
      // For now directly navigate to success
      navigate("/order/success");
      return;
    }

    // Online Payment
    handleRazorpayPayment();
  };

  return (
    <div className="checkoutSection !w-full flex flex-col sm:flex-row gap-6 !max-w-7xl">
      <div className="checkoutDetailsSection">
        <h4>Billing Details</h4>
        <form className="checkoutDetailsForm flex flex-col gap-4 mt-4 !w-full !max-w-7xl">
          {/* First + Last Name */}
          <div className="checkoutDetailsFormRow grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                placeholder="First Name *"
                value={billing.firstName}
                onChange={handleBillingChange("firstName")}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
              />
              {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name *"
                value={billing.lastName}
                onChange={handleBillingChange("lastName")}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
              />
              {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
            </div>
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Company Name (optional)"
              value={billing.company}
              onChange={handleBillingChange("company")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
          </div>

          {/* Country / Region */}
          <div className="mb-4">
            <select
              value={billing.country}
              onChange={handleBillingChange("country")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            >
              <option value="" disabled>
                Country / Region *
              </option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
            {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
          </div>

          {/* Street Address */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Street Address *"
              value={billing.street}
              onChange={handleBillingChange("street")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.street && <div className="text-red-500 text-sm mt-1">{errors.street}</div>}
          </div>

          {/* Town / City */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Town / City *"
              value={billing.city}
              onChange={handleBillingChange("city")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
          </div>

          {/* Postcode / ZIP */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Postcode / ZIP *"
              value={billing.postcode}
              onChange={handleBillingChange("postcode")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.postcode && <div className="text-red-500 text-sm mt-1">{errors.postcode}</div>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone *"
              value={billing.phone}
              onChange={handleBillingChange("phone")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email *"
              value={billing.email}
              onChange={handleBillingChange("email")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <button
              type="button"
              onClick={handleBillingSubmit}
              className="bg-[#bfa046] text-white px-5 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
            {errors.form && <div className="text-red-500 text-sm mt-2">{errors.form}</div>}
          </div>
        </form>
      </div>

      <div
        className="checkoutPaymentSection"
        aria-hidden={!billingSubmitted}
        style={{ pointerEvents: billingSubmitted ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-6 mb-6 !w-full">
          <CartTotals
            totalPrice={totalPrice}
            cartItems={cartItems}
            handleTabClick={handleTabClick}
            hideCheckoutButton={true}
            discountedPrice={discountedPrice}
          />
        </div>

        <div className="checkoutPaymentContainer">
          {["Cash on delivery", "Online Payment"].map((method) => (
            <label key={method} className="flex items-center gap-2">
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
            // If payment section is not yet enabled, prevent action
            if (!billingSubmitted) return;
            // Set payments state if provided by parent (keeps previous contract)
            if (typeof setPayments === "function") setPayments(true);
            // CTA behavior depends on selectedPayment
            handleCTA();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="bg-[#bfa046] text-white px-5 py-2 rounded-md"
          disabled={!billingSubmitted || paymentProcessing}
        >
          {selectedPayment === "Cash on delivery"
            ? "Place Order"
            : paymentProcessing
            ? "Processing..."
            : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartTab2;

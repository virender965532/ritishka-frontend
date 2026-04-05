import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartTotals from "./CartTotals";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { fetchAddresses, createAddress, createCheckout } from "../../api/api";
import { useSelector } from "react-redux";
import { CART_SHIPPING_AMOUNT, CART_GST_PERCENTAGE } from "../../Constants/Constants";

const ShoppingCartTab2 = ({
  cartItems,
  totalPrice,
  handleTabClick,
  setPayments,
  selectedPayment,
  handlePaymentChange,
  scrollToTop,
  discountedPrice,
  user,
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
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const reduxUser = useSelector((state) => state?.userData?.user);
  const [RazorPayOption, setRazorPayOption] = useState({
        key: "rzp_test_RbKxQcjvVIdXzY", // dummy test key
        currency: "INR",
        name: "Ritishka Silver",
        description: "",
        handler: function (response) {
          window.location.href = "/order/success";
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "",
        },
        theme: {
          color: "#bfa046",
        }
      });

  // Ensure default payment selection is Online Payment
  useEffect(() => {
    if ((!selectedPayment || selectedPayment === "") && typeof handlePaymentChange === "function") {
      // create a synthetic event object to set default
      handlePaymentChange({ target: { value: "Online Payment" } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // populate billing from logged-in user when available
  useEffect(() => {
    const u = user || reduxUser || {};
    if (u) {
      const name = (u.name || "").trim();
      const [first = "", ...rest] = name.split(" ");
      const last = rest.join(" ");
      setBilling((s) => ({ ...s, firstName: s.firstName || first, lastName: s.lastName || last, phone: s.phone || u.phone || "", email: s.email || u.email || "" }));
    }
  }, [user, reduxUser]);

  // load addresses and auto-select primary
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoadingAddresses(true);
      try {
        const res = await fetchAddresses();
        const data = res?.data || [];
        if (cancelled) return;
        setAddresses(data);
        // find primary address
        const primary = data.find((a) => a.primary || a.isPrimary || a.is_primary || a.primaryAddress) || data[0];
        if (primary) {
          setSelectedAddressId(primary._id || primary.id || primary._doc?._id);
          // populate billing fields from primary address
          populateBillingFromAddress(primary);
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      } finally {
        if (!cancelled) setLoadingAddresses(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const populateBillingFromAddress = (addr) => {
    if (!addr) return;
    setBilling((s) => ({
      ...s,
      firstName: s.firstName,
      lastName: s.lastName,
      flat: addr.flat || s.flat || "",
      locality: addr.locality || s.locality || "",
      area: addr.area || s.area || "",
      landmark: addr.landmark || s.landmark || "",
      city: addr.city || s.city || "",
      state: addr.state || s.state || "",
      country: addr.country || "India",
      pincode: addr.pincode || s.pincode || "",
      phone: s.phone,
      email: s.email,
      company: s.company || "",
    }));
  };

  const validate = () => {
    const e = {};
    if (!billing.firstName.trim()) e.firstName = "First name is required";
    if (!billing.lastName.trim()) e.lastName = "Last name is required";
    if (!billing.country) e.country = "Country is required";
    if (!billing.flat.trim()) e.flat = "Flat is required";
    if (!billing.locality.trim()) e.locality = "Locality is required";
    if (!billing.city.trim()) e.city = "City is required";
    if (!billing.pincode.trim()) e.pincode = "Pincode is required";
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
      const itemsPayload = (cartItems || []).map((it) => ({
        product: it?._id || it.product_id || it.product,
        quantity: it.quantity || 1,
        makingCharge: it.makingCharge || 0,
        discount: it.discount || 0,
      }));
      const createRes = await createCheckout({ items: itemsPayload, addressId: selectedAddressId, shippingCharge: CART_SHIPPING_AMOUNT, tax: CART_GST_PERCENTAGE, discount: 0 });
      const checkout = createRes?.data?.checkout;
      const amountToPay = Math.round((checkout?.grandTotal || totalPrice || 0) * 100);
      // order_id: checkout?.razorpayOrderId || "",
      // description: `Ritishka Silver Payment for Order #${checkout?.razorpayOrderId || ""}`,
      setRazorPayOption((OldRazorPayOption) => ({
        ...OldRazorPayOption,
        amount: amountToPay,
        notes: `address: ${billing.flat} ${billing.locality} ${billing.area} ${billing.city} ${billing.state} ${billing.country} - ${billing.pincode}`,
        prefill: {
          name: `${billing.firstName} ${billing.lastName}` || "",
          email: billing.email || "",
          contact: billing.phone || "",
        },
        customer_id: reduxUser?._id || "",
      }));
      //create order from here and get order id and assign to RazorPayOption.order_id
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

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr._id || addr.id);
    populateBillingFromAddress(addr);
  };
  const handleRazorpayPayment = async () => {
    // setPaymentProcessing(true);
    // create checkout on backend first
    try {
      await loadRazorpayScript();
      console.log("RazorPayOption before creating instance:", RazorPayOption);
      const razorpayInstance = new Razorpay(RazorPayOption);
      razorpayInstance.open();
    } catch (err) {
      console.error("Error creating checkout or opening payment:", err);
      setErrors({ form: "Unable to initiate payment. Please try again." });
      // setPaymentProcessing(false);
      return;
    }
  };

  const handleCTA = () => {
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

          {/* flat */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Flat *"
              value={billing.flat}
              onChange={handleBillingChange("flat")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.flat && <div className="text-red-500 text-sm mt-1">{errors.flat}</div>}
          </div>

          {/* Locality */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Locality Address *"
              value={billing.locality}
              onChange={handleBillingChange("locality")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.locality && <div className="text-red-500 text-sm mt-1">{errors.locality}</div>}
          </div>

          {/* Area */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Area Address *"
              value={billing.area}
              onChange={handleBillingChange("area")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.area && <div className="text-red-500 text-sm mt-1">{errors.area}</div>}
          </div>

          {/* Landmark */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Landmark *"
              value={billing.landmark}
              onChange={handleBillingChange("landmark")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.landmark && <div className="text-red-500 text-sm mt-1">{errors.landmark}</div>}
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

          {/* State */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="State *"
              value={billing.state}
              onChange={handleBillingChange("state")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.state && <div className="text-red-500 text-sm mt-1">{errors.state}</div>}
          </div>

          {/* Pincode  */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Pincode / ZIP *"
              value={billing.pincode}
              onChange={handleBillingChange("pincode")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            />
            {errors.pincode && <div className="text-red-500 text-sm mt-1">{errors.pincode}</div>}
          </div>

          {/* Country */}
          <div className="mb-4">
            <select
              value={billing.country}
              onChange={handleBillingChange("country")}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bfa046]"
            >
              <option value="" disabled>
                Country
              </option>
              <option>India</option>
            </select>
            {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
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
          disabled={!billingSubmitted}
          style={{ pointerEvents: billingSubmitted ? "auto" : "none" }}
        >Proceed to Payment
        </button>

        {/* Addresses list */}
        {loadingAddresses ? (
          <div className="policyText">Loading addresses...</div>
        ) : (
          <div className="checkoutPaymentContainer mt-4">
            {addresses && addresses.length > 0 ? (
              addresses.map((addr) => {
                const id = addr._id || addr.id;
                return (
                  <div key={id} className="border p-4 rounded-md mb-3 bg-white">
                    <div className="flex justify-between items-start">
                      <label className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === id}
                          onChange={() => handleSelectAddress(addr)}
                        />
                        <div>
                          <div className="font-semibold text-[#7c5e10]">{addr.flat}{addr.locality ? ", " + addr.locality : ""} </div>
                          <div className="text-sm text-[#7c5e10]">{addr.area} {addr.landmark} {addr.city}</div>
                          <div className="text-sm text-[#7c5e10]">{addr.state} {addr.country} {addr.pincode}</div>
                        </div>
                      </label>
                      <div>
                        {addr.isPrimary && <span className="text-sm text-[#bfa046]">Primary</span>}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="policyText">No saved addresses found.</div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ShoppingCartTab2;

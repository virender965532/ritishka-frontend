import React from "react";

const ShoppingCartTab3 = ({
  cartItems,
  totalPrice,
  selectedPayment,
  success,
}) => {
  // Generate order number and current date
  const currentDate = new Date();
  const orderNumber = Math.floor(Math.random() * 100000);

  // Format date in DD/MM/YYYY
  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="orderCompleteSection">
      {/* ✅ Success Message */}
      <div className="orderCompleteMessage">
        <img src={success} alt="success" />
        <h3>Your order is completed!</h3>
        <p>Thank you. Your order has been received successfully.</p>
      </div>

      {/* ✅ Order Info Summary */}
      <div className="orderInfo">
        <div>
          <p>Order Number</p>
          <h4>{orderNumber}</h4>
        </div>
        <div>
          <p>Date</p>
          <h4>{formatDate(currentDate)}</h4>
        </div>
        <div>
          <p>Total</p>
          <h4>₹{totalPrice.toFixed(2)}</h4>
        </div>
        <div>
          <p>Payment Method</p>
          <h4>{selectedPayment}</h4>
        </div>
      </div>

      {/* ✅ Order Details Table */}
      <div className="orderTotalContainer">
        <h3>Order Details</h3>
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Subtotals</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.title} x {item.quantity}
                </td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <th>Shipping</th>
              <td>₹50.00</td>
            </tr>
            <tr>
              <th>VAT</th>
              <td>₹100.00</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>₹{(totalPrice + 150).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ✅ Thank You Section */}
      <div className="orderThankYou">
        <p>
          You will receive an order confirmation email shortly with the tracking
          details once your order has been shipped.
        </p>
      </div>
    </div>
  );
};

export default ShoppingCartTab3;

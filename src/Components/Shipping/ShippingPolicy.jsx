import React from 'react'
import "./ShippingPolicy.css"

const ShippingPolicy = () => {
  return (
    <>
    <div className="policy-wrap">
      <div className="policy-card">
        <h1 className="policy-title">📦 Shipping Policy</h1>
        <p className="last-updated"><strong>Last Updated:</strong> [Insert Date]</p>
        <p>
          At <strong>Ritishka Jewellery</strong>, operated by{" "}
          <strong>Sanjay and Company</strong>, we aim to deliver your jewellery
          quickly and securely. Please review our shipping policy below.
        </p>

        <h2>1. Processing Time</h2>
        <ul>
          <li>Orders are processed within <strong>1–2 business days</strong> after payment confirmation.</li>
          <li>Customized jewellery may take <strong>5–7 business days</strong>.</li>
        </ul>

        <h2>2. Delivery Time</h2>
        <ul>
          <li>Metro Cities: 3–5 business days</li>
          <li>Other Cities: 5–7 business days</li>
          <li>Remote/Interiors: 7–10 business days</li>
        </ul>
        <p><em>Delivery times may vary due to courier delays or unforeseen events.</em></p>

        <h2>3. Shipping Charges</h2>
        <ul>
          <li>Free Shipping on prepaid orders above ₹999 within India.</li>
          <li>Orders below ₹999 may attract a fee of ₹49–₹99.</li>
          <li>COD (if available) may include an extra fee.</li>
        </ul>

        <h2>4. Tracking Orders</h2>
        <p>Once shipped, customers will receive SMS/Email with tracking details.</p>

        <h2>5. International Shipping</h2>
        <p>Currently, Ritishka Jewellery ships <strong>only within India</strong>.</p>

        <h2>6. Delays & Responsibility</h2>
        <p>
          We are not responsible for delays caused by couriers, natural events,
          or incorrect shipping addresses provided by customers.
        </p>

        <h2>7. Wrong/Incomplete Address</h2>
        <p>
          Customers are responsible for providing the correct address. Orders
          returned due to wrong/incomplete address must be re-shipped at
          customer’s cost.
        </p>

        <h2>📩 Contact Us</h2>
        <p>For shipping-related queries, reach out to us:</p>
        <p>📧 Email: <a href="mailto:ritishkasilver@gmail.com">ritishkasilver@gmail.com</a></p>
        <p>📞 Phone: +91 85955220018</p>
        <p>🏠 Address: A-79/16, Baba Colony, Burari, Delhi – 110084</p>

        <p className="policy-note">
          ⚠️ Ritishka Jewellery reserves the right to update this policy at any
          time without prior notice.
        </p>
      </div>
    </div>

    </>
  )
}

export default ShippingPolicy
import React from 'react'
import "./RefundReturnsPolicy.css"

const RefundReturnsPolicy = () => {
  return (
    <>
    <div className="refund-container">
      <h1>Refund & Return Policy</h1>
      <p><strong>Last Updated:</strong> August 31, 2025</p>

      <h2>1. Eligibility for Returns</h2>
      <ul>
        <li>Products must be returned within <span className="highlight">7 days of delivery</span>.</li>
        <li>Items must be <span className="highlight">unused, unworn, and in original packaging</span> with all tags and invoice.</li>
        <li>Customized, engraved, or personalized items <span className="highlight">cannot be returned</span>.</li>
        <li>Earrings and nose pins are non-returnable due to hygiene reasons.</li>
      </ul>

      <h2>2. Non-Returnable Items</h2>
      <p>
        Sale/clearance items and jewellery showing signs of wear, damage, or
        alteration will not be accepted.
      </p>

      <h2>3. Refund Process</h2>
      <p>
        Once we receive and inspect your item, we will notify you of the refund
        status. Approved refunds will be processed within <span className="highlight">7–10 business days</span> to your original payment method.
      </p>
      <p><em>Note: Shipping charges are non-refundable.</em></p>

      <h2>4. Exchange Policy</h2>
      <p>
        Exchanges are allowed within 7 days of delivery (subject to stock
        availability).
      </p>

      <h2>5. Return Shipping</h2>
      <p>
        Customers are responsible for return shipping. Please use safe
        packaging and a reliable trackable courier service.
      </p>

      <h2>6. Damaged or Wrong Item</h2>
      <p>
        If you receive a defective, damaged, or incorrect item, contact us
        within <span className="highlight">48 hours</span> of delivery with pictures. We will
        replace or refund at no extra cost.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        📧 Email: ritishkasilver@gmail.com <br />
        📞 Phone: +91 85955220018 <br />
        🏠 Address: A-79/16, Baba Colony, Burari, Delhi – 110084
      </p>

      <p>
        ⚠️ Ritishka Jewellery reserves the right to update or modify this policy at any time without prior notice.
      </p>
    </div>
    </>
  )
}

export default RefundReturnsPolicy;
import React from "react";

import "./TermsandConditions.css";

// export default function TermsandConditions() {
//   const lastUpdated = "September 2, 2025";

  const Section = ({ title, children }) => (
    <section className="tos-section">
      <h2>{title}</h2>
      <div className="tos-card">{children}</div>
    </section>
  );
const TermsandConditions = () => {
  return (
    <>
     <main className="tos-wrap">
      <header className="tos-hero">
        <h1>Terms of Service</h1>
        <p>
          Welcome to <strong>Ritishka</strong> (“we,” “our,” “us”). These Terms
          of Service govern the use of our website, services, and purchase of
          products from <strong>Sanjay and Company</strong> (A-79/16 Baba Colony,
          Burari, Delhi – 110084).
        </p>
        {/* <p className="tos-meta">Last Updated: {lastUpdated}</p> */}
      </header>

      <p className="tos-note">
        By accessing or using our website, you agree to these Terms of Service.
        If you do not agree, you may not use our services.
      </p>

      <Section title="1. General Information">
        <ul>
          <li><strong>Brand Name:</strong> Ritishka</li>
          <li><strong>Company Name:</strong> Sanjay and Company</li>
          <li><strong>Email:</strong> ritishkasilver@gmail.com</li>
          <li><strong>Phone:</strong> +91 85955220018</li>
          <li><strong>Address:</strong> A-79/16 Baba Colony, Burari, Delhi – 110084</li>
          <li><strong>Business Type:</strong> E-commerce Silver Jewellery</li>
        </ul>
      </Section>

      <Section title="2. Eligibility">
        <p>
          You must be at least 18 years old to purchase products from our
          website. By placing an order, you confirm that you are legally capable
          of entering into binding contracts.
        </p>
      </Section>

      <Section title="3. Products & Services">
        <ul>
          <li>We deal in 925 Sterling Silver Jewellery & Rose-Plated Silver Jewellery.</li>
          <li>Products include rings, bracelets, pendants, earrings, necklaces, toe rings, anklets, chains, and kids’ jewellery.</li>
          <li>Descriptions, images, and pricing may change without notice.</li>
        </ul>
      </Section>

      <Section title="4. Orders & Payments">
        <ul>
          <li>All orders are subject to acceptance and availability.</li>
          <li>Prices are shown in INR (₹) and may include/exclude taxes as displayed at checkout.</li>
          <li>Payments must be made via secure payment gateways on our site.</li>
        </ul>
      </Section>

      <Section title="5. Shipping & Delivery">
        <ul>
          <li>Orders are processed and shipped within the mentioned timelines.</li>
          <li>Delivery times vary by location.</li>
          <li>We are not responsible for courier delays or unforeseen circumstances.</li>
        </ul>
      </Section>

      <Section title="6. Returns & Refunds">
        <ul>
          <li>See our Return & Refund Policy for details.</li>
          <li>Products must be unused, in original packaging, and returned within the return period.</li>
          <li>Refunds (if approved) are processed via the original payment method.</li>
        </ul>
      </Section>

      <Section title="7. User Responsibilities">
        <ul>
          <li>Do not misuse our services or website.</li>
          <li>Do not engage in fraudulent or unlawful activities.</li>
          <li>Do not copy or exploit any part of the site without permission.</li>
        </ul>
      </Section>

      <Section title="8. Intellectual Property">
        <p>
          All content (logos, text, designs, and product photos) is the property
          of Ritishka (Sanjay and Company) and protected by law.
        </p>
      </Section>

      <Section title="9. Limitation of Liability">
        <ul>
          <li>We are not liable for indirect or consequential damages.</li>
          <li>Our liability will not exceed the amount you paid for the product.</li>
        </ul>
      </Section>

      <Section title="10. Privacy Policy">
        <p>Your use of our website is also governed by our Privacy Policy.</p>
      </Section>

      <Section title="11. Changes to Terms">
        <p>
          We may update these Terms of Service at any time. The latest version
          will always appear on this page.
        </p>
      </Section>

      <Section title="12. Governing Law">
        <p>
          These Terms are governed by Indian law. Disputes are subject to Delhi
          courts only.
        </p>
      </Section>

      <Section title="13. Contact Information">
        <ul>
          <li><strong>Email:</strong> ritishkasilver@gmail.com</li>
          <li><strong>Phone:</strong> +91 85955220018</li>
          <li><strong>Address:</strong> A-79/16 Baba Colony, Burari, Delhi – 110084</li>
        </ul>
      </Section>

      <footer className="tos-foot">
        © {new Date().getFullYear()} Ritishka (Sanjay and Company). All rights reserved.
      </footer>
    </main>
    </>
  );
};

export default TermsandConditions;

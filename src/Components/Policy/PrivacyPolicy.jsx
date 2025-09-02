import React from 'react'
import "./PrivacyPolicy.css"

const PrivacyPolicy = () => {
  return (
  <>
    <main className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-subtitle">Ritishka — operated by Sanjay and Company</p>
      <p className="privacy-date">Effective Date: August 31, 2025</p>

      <p>
        At <strong>Ritishka</strong>, operated by <strong>Sanjay and Company</strong>, we respect and value your privacy. 
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
        visit or make a purchase from our website.
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email, phone, billing/shipping address.</li>
          <li><strong>Payment Information:</strong> Collected securely via our payment partners.</li>
          <li><strong>Order Information:</strong> Purchase history, preferences, communications.</li>
          <li><strong>Technical Information:</strong> IP, browser, device, cookies.</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Processing and delivering orders</li>
          <li>Customer support and queries</li>
          <li>Order updates and promotions (opt-in)</li>
          <li>Improving services and experience</li>
          <li>Legal compliance</li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing of Information</h2>
        <p>We do not sell or rent your personal information. We may share data only with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Couriers, payment gateways, IT services.</li>
          <li><strong>Legal Authorities:</strong> If required by law.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>We use security measures to protect your data, though no method is 100% secure.</p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>We use cookies to enhance browsing. You may disable cookies, but some features may not work.</p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <ul>
          <li>Access your data</li>
          <li>Request corrections</li>
          <li>Request deletion (where legally possible)</li>
          <li>Opt out of marketing</li>
        </ul>
      </section>

      <section>
        <h2>7. Third-Party Links</h2>
        <p>We are not responsible for external sites linked from our website.</p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <address>
          <strong>Sanjay and Company (Ritishka)</strong><br />
          A-79/16, Baba Colony, Burari, Delhi – 110084<br />
          Email: <a href="mailto:ritishkasilver@gmail.com">ritishkasilver@gmail.com</a><br />
          Phone: <a href="tel:+9185955220018">+91 85955 22018</a>
        </address>
      </section>

      <section>
        <h2>9. Updates to Privacy Policy</h2>
        <p>We may update this policy from time to time. Please check periodically for updates.</p>
      </section>

      <footer className="privacy-footer">
        &copy; {new Date().getFullYear()} Ritishka — All Rights Reserved.
      </footer>
    </main>
  </>
  );
};

export default PrivacyPolicy;
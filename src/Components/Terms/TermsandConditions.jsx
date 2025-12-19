import React from "react";
import "./TermsandConditions.css";

const TermsandConditions = () => {
  return (
    <div className="termsOverlay">
      <div className="termsCard">
        <h1 className="terms-heading">Terms and Conditions</h1>

        <p className="terms-paragraph">
          Welcome to "Ritishka" These Terms and Conditions govern your use of our
          website and the purchase of any products from us. By accessing or using
          our website, you agree to be bound by these Terms and Conditions. Please
          read them carefully.
        </p>

        <h2 className="terms-subHeading">1. General</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Agreement to Terms:</span> By using this
            website, you agree to comply with and be bound by these Terms and
            Conditions and our Privacy Policy. If you do not agree to these terms,
            you should not use this website.
          </li>
          <li>
            <span className="bold">Modifications:</span> We, ritishka operated by Sanjay and Company,
            reserve the right to modify these Terms and Conditions at any time
            without prior notice. Your continued use of the website after any such
            changes constitutes your acceptance of the new Terms.
          </li>
          <li>
            <span className="bold">Eligibility:</span> By placing an order, you
            warrant that you are at least 18 years old or have a parent or
            guardian's consent to do so.
          </li>
        </ul>

        <h2 className="terms-subHeading">2. Products and Services</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Product Information:</span> We strive to ensure
            that all product descriptions, photographs, and pricing information
            for our 925 silver jewellery are accurate. However, we do not
            guarantee that the information is error-free, complete, or current. We
            reserve the right to correct any errors, inaccuracies, or omissions at
            any time.
          </li>
          <li>
            <span className="bold">Pricing:</span> All prices are in Indian Rupees
            (INR) and are subject to change without notice. Prices listed on the
            website do not include shipping fees or applicable taxes, which will
            be calculated and added to your total at checkout.
          </li>
          <li>
            <span className="bold">Availability:</span> All products are subject
            to availability. We reserve the right to limit the quantity of
            products we supply and to refuse an order for any reason.
          </li>
        </ul>

        <h2 className="terms-subHeading">3. Orders and Payments</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Order Acceptance:</span> Your order is an
            offer to buy a product. We will confirm our acceptance of your order
            by sending you an email confirmation. The contract for the purchase of
            a product will be formed when we send you the confirmation email.
          </li>
          <li>
            <span className="bold">Payment:</span> We accept various payment
            methods, including credit cards, debit cards, and net banking. You
            agree to provide current, complete, and accurate purchase and account
            information. You agree to promptly update your account information so
            we can complete your transactions and contact you as needed.
          </li>
          <li>
            <span className="bold">Security:</span> We use a secure third-party
            payment processor to handle all transactions. We do not store your
            credit card or sensitive financial information.
          </li>
        </ul>

        <h2 className="terms-subHeading">4. Shipping and Delivery</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Shipping:</span> We will ship your order to the
            address you provide. Shipping times are estimates and may vary. We are
            not responsible for delays caused by the shipping carrier.
          </li>
          <li>
            <span className="bold">Risk of Loss:</span> The risk of loss and title
            for all products purchased from us pass to you upon our delivery to
            the shipping carrier.
          </li>
        </ul>

        <h2 className="terms-subHeading">5. Returns and Refunds</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Return Policy:</span> We offer a 7-day return
            policy on most products. To be eligible for a return, your item must
            be unused, in the same condition that you received it, and in its
            original packaging. Please note that personalized or final sale items
            are not eligible for a return.
          </li>
          <li>
            <span className="bold">Refunds:</span> Once we receive and inspect
            your returned item, we will notify you of the approval or rejection of
            your refund. If approved, your refund will be processed, and a credit
            will automatically be applied to your original method of payment
            within a certain number of days.
          </li>
          <li>
            <span className="bold">Return Shipping:</span> You will be responsible
            for paying for your own shipping costs for returning your item.
            Shipping costs are non-refundable.
          </li>
        </ul>

        <h2 className="terms-subHeading">6. Intellectual Property</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Copyright:</span> All content on this website,
            including text, graphics, logos, images, and software, is the property
            of Sanjay and Company or its content suppliers and is protected by
            Indian and international copyright laws.
          </li>
          <li>
            <span className="bold">Trademarks:</span> The Ritishka name and logo,
            and other trademarks, service marks, and logos used and displayed on
            this site are registered and unregistered trademarks of Sanjay and
            Company.
          </li>
        </ul>

        <h2 className="terms-subHeading">7. Limitation of Liability</h2>
        <ul className="terms-list">
          <li>
            <span className="bold">Disclaimer:</span> Our website and products are
            provided on an "as-is" and "as-available" basis. We make no
            representations or warranties of any kind, express or implied, as to
            the operation of the site or the information, content, materials, or
            products included on this site.
          </li>
          <li>
            <span className="bold">Limitation:</span> To the full extent
            permissible by applicable law, Sanjay and Company will not be liable
            for any damages of any kind arising from the use of this site or from
            any products purchased from this site.
          </li>
        </ul>

        <h2 className="terms-subHeading">8. Governing Law and Jurisdiction</h2>
        <p className="terms-paragraph">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of Delhi, India, without regard to its conflict of law
          provisions. Any legal action or proceeding related to this website shall
          be brought exclusively in the courts of Delhi.
        </p>

        <h2 className="terms-subHeading">9. Contact Information</h2>
        <ul className="terms-list">
          <li><span className="bold">Company Name:</span> Sanjay and Company</li>
          <li><span className="bold">Phone No.:</span> 8595220018</li>
          <li><span className="bold">Address:</span> A-79/16 Baba Colony, Burari, Delhi 110084</li>
          <li><span className="bold">Website:</span> Ritishka.in</li>
        </ul>

        <p className="terms-paragraph">
          <span className="bold">Effective Date:</span> September 4, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsandConditions;

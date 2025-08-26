import React from "react";
import "./Footer.css";
// import logo from "../../Assets/logo.png";
import paymentIcon from "../../Assets/paymentIcon.png";
import { FaFacebookF } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
// import { FaPinterest } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div className="footer_left">
            {/* <div className="footer_logo_container">
              <img src={logo} alt="" Z />
            </div> */}
            <div className="footer_content">
              <h5>Sanjay And Company</h5>
            </div>
           <p>BIS : HM/C - 9716620018</p>
            <p>Address: A-79/16 Baba Colony Burari Delhi 110084</p>
            

            <div className="footer_address">
              <strong> Email : care@ritishka.in </strong>
              <strong> Call : +91-8595220018 </strong>
            </div>

            <div className="social_links">
              <FaFacebookF />
              {/* <FaXTwitter /> */}
              <FaInstagram />
              <FaYoutube />
              {/* <FaPinterest /> */}
            </div>
          </div>

          <div className="footer_content">
            <h5>About Us</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="*">Careers</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/">Jewellery Care </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Shop</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/shop">Silver Jewellery</Link>
                </li>
                <li>
                  <Link to="/shop">Women</Link>
                </li>
                <li>
                  <Link to="/shop">Men</Link>
                </li>
                <li>
                  <Link to="/shop">Kids</Link>
                </li>
                <li>
                  <Link to="/shop">Gifts</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer_content">
            <h5>Customer Services</h5>
            <div className="links_container">
              <ul onClick={scrollToTop}>
                <li>
                  <Link to="/loginSignUp">Track Your Order</Link>
                </li>
                <li>
                  <Link to="/loginSignUp">Return & Exchange</Link>
                </li>
                <li>
                  <Link to="/Services">Shipping & Handling</Link>
                </li>
                <li>
                  <Link to="/terms">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/blog">Terms of Service</Link>
                </li>
                {/* <li>
                  <Link to="/">Gift Card</Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="footer_right">
            <h5>Subscribe</h5>
            <p>
              For any suggestions, queries or complaints please contact us:
            </p>

            <form onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Join</button>
            </form>

            <h6>Secure Payments</h6>
            <div className="paymentIconContainer">
              <img src={paymentIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <p>
            © {getCurrentYear()} Ritishka. All Rights Reserved{" "}
            {/* <a
              href="https://github.com/shakti177"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#C22928", textDecoration: "none" }}
            >
              Virender Kumar
            </a>{" "} */}
          </p>
          <div className="footerLangCurrency">
            {/* <div className="footerLang">
              <p>Language</p>
              <select name="language" id="language">
                <option value="english">United States | English</option>
                <option value="Hindi">Hindi</option>
                <option value="Germany">Germany</option>
                <option value="French">French</option>
              </select>
            </div>
            <div className="footerCurrency">
              <p>Currency</p>
              <select name="currency" id="currency">
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

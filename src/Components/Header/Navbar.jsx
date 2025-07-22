import React, { useState, useEffect, useMemo } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { NAVBAR_LINKS } from "../../Constants/Constants"; // <-- Import your links
import { fetchCategories } from "../../api/api"; // <-- Add this import, adjust path as needed
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; // <-- Adjust the import path as needed
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState(NAVBAR_LINKS);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 10px, set sticky
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMemo(() => {
      const fetchData = async () => {
        try {
          const res = await fetchCategories({ page: 1, limit: 10, search: "" });
          let cats = res.data.categories || [];
          cats = cats.filter((cat) => cat.isactive);
          cats.sort((a, b) => a.name.localeCompare(b.name));
          cats = cats.map(cat => ({
            label: cat.name,
            to: `/shop?category=${cat.slug || cat.name.toLowerCase()}`
          }));
          setNavbarLinks(prevLinks => prevLinks.map(link =>
            link.label === "Categories" ? { ...link, children: cats } : link
          ));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchData();
    }, []); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className={`navBar${isSticky ? " sticky" : ""}`}>
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              {navbarLinks.map((link) =>
                link.isDropdown ? (
                  <li key={link.label} className="dropdown">
                    <span className="dropdown-header">{link.label}</span>
                    <ul className="dropdown-menu dropdown-menu-categories">
                      {link.children && link.children.length > 0 ? (
                        link.children.map((child) => (
                          <li key={child.to}>
                            <Link to={child.to} onClick={scrollToTop}>
                              {child.label}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li><span>Loading...</span></li>
                      )}
                    </ul>
                  </li>
                ) : (
                  <li key={link.to}>
                    <Link to={link.to} onClick={scrollToTop}>
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          <Link to="/login" onClick={scrollToTop}>
            <FaRegUser size={22} />
          </Link>
          <Link to="/cart" onClick={scrollToTop}>
            <Badge
              badgeContent={cart?.items.length === 0 ? "0" : cart?.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} onClick={scrollToTop} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge
              badgeContent={cart?.items.length === 0 ? "0" : cart?.items.length}
              color="primary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <RiShoppingBagLine size={22} color="black" />
            </Badge>
          </Link>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <Link to="/shop">
                  <FiSearch size={22} onClick={toggleMobileMenu} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                {navbarLinks.map((link) =>
                  link.isDropdown ? (
                    <li key={link.label} className="dropdown">
                      <span className="dropdown-header">{link.label}</span>
                      <ul className="dropdown-menu dropdown-menu-categories">
                        {link.children && link.children.length > 0 ? (
                          link.children.map((child) => (
                            <li key={child.to}>
                              <Link to={child.to} onClick={scrollToTop}>
                                {child.label}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li><span>Loading...</span></li>
                        )}
                      </ul>
                    </li>
                  ) : (
                    <li key={link.to}>
                      <Link to={link.to} onClick={scrollToTop}>
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <Link to="/login" onClick={toggleMobileMenu}>
                <FaRegUser />
                <p>My Account</p>
              </Link>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

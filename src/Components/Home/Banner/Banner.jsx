import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { BANNER_DATA } from "../../../Constants/Constants";

const Banner = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="banner">
      {BANNER_DATA.map((item, idx) => {
        const sideClass = idx === 0 ? "bannerLeft" : "bannerRight";
        return (
          <div className={sideClass} key={idx}>
            <h6 className="bannerh6" style={{ color: "black" }}>
              {item.price}
            </h6>
            <h3 className="bannerh3" style={{ color: "black" }}>
              {item.title}
            </h3>
            <h5 className="bannerh5">
              <Link
                to={item.link}
                onClick={scrollToTop}
                style={{ color: "black" }}
              >
                Shop Now
              </Link>
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;

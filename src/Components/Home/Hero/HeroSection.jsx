import React, { useState, useEffect, useRef } from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";
import { fetchHeroSections } from "../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SLIDE_INTERVAL = 3000; // 3 seconds for better UX

const HeroSection = () => {
  const [heroProducts, setHeroProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchHeroSections().then((res) => {
      const active = (res.data || []).filter((item) => item.isactive);
      setHeroProducts(active);
    });
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused || heroProducts.length === 0) return;
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [current, isPaused, heroProducts]);

  const goToNext = () => {
    if (heroProducts.length === 0) return;
    const next = (current + 1) % heroProducts.length;
    setCurrent(next);
  };

  const goToPrev = () => {
    if (heroProducts.length === 0) return;
    const prev = (current - 1 + heroProducts.length) % heroProducts.length;
    setCurrent(prev);
  };

  // Manual slide via dots
  const goToSlide = (idx) => {
    setCurrent(idx);
    clearTimeout(timeoutRef.current);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (heroProducts.length === 0) {
    return (
      <div className="heroMain">
        <div style={{ margin: "auto", fontSize: 24 }}>
          No active hero sections found.
        </div>
      </div>
    );
  }

  const product = heroProducts[current];

  return (
    <div
      className="heroMain"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        className="heroArrow left"
        onClick={goToPrev}
        aria-label="Previous Slide"
      >
        <IoIosArrowBack />
      </button>
      <div className="sectionleft">
        <h1>{product.title}</h1>
        <span>{product.subtitle}</span>
        <div className="heroLink">
          <Link to={product.link} onClick={scrollToTop}>
            <h5>Discover More</h5>
          </Link>
        </div>
      </div>
      <div className="sectionright">
        <div className="heroImage">
          {/* <img src={product.image} alt={product.title} /> */}
          <img
            alt={product.title}
            className="heroImage-img"
            src={getImageUrl(product.image)}
            loading="lazy"
          />
        </div>
      </div>
      <button
        className="heroArrow right"
        onClick={goToNext}
        aria-label="Next Slide"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default HeroSection;

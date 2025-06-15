import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";
import { fetchHeroSections } from "../../../api/api";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SLIDE_INTERVAL = 3000; // 3 seconds for better UX

const HeroSection = () => {
  const [heroProducts, setHeroProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [productColor, setProductColor] = useState("");
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchHeroSections().then((res) => {
      const active = (res.data || []).filter((item) => item.isactive);
      setHeroProducts(active);
      if (active.length > 0) {
        setProductColor(active[0].defaultColor);
      }
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
    setProductColor(heroProducts[next].defaultColor);
  };

  const goToPrev = () => {
    if (heroProducts.length === 0) return;
    const prev = (current - 1 + heroProducts.length) % heroProducts.length;
    setCurrent(prev);
    setProductColor(heroProducts[prev].defaultColor);
  };

  // Change color for current product
  const changeColor = (color) => {
    setProductColor(color);
  };

  // Manual slide via dots
  const goToSlide = (idx) => {
    setCurrent(idx);
    setProductColor(heroProducts[idx].defaultColor);
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
        <Canvas
          className="canvasModel"
          camera={{ position: [0, 5, 15], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={2.5}
            color={"white"}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Model color={productColor} modelPath={product.modelPath} />
        </Canvas>
        <div className="heroColorBtn">
          {product.colors &&
            product.colors.map((color) => (
              <button
                key={color}
                onClick={() => changeColor(color)}
                style={{ backgroundColor: color }}
              ></button>
            ))}
        </div>
        {/* Dots navigation */}
        <div className="heroSliderDots">
          {heroProducts.map((_, idx) => (
            <span
              key={idx}
              className={`dot${idx === current ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
            ></span>
          ))}
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

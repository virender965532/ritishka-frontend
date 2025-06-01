import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./HeroSection.css";
import { Model } from "../../Model/Model";
import { Link } from "react-router-dom";
import { HERO_PRODUCT } from "../../../Constants/Constants"; // Import the JSON

const HeroSection = () => {
  const [productColor, setProductColor] = useState(HERO_PRODUCT.defaultColor);

  const changeColor = (color) => {
    setProductColor(color);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="heroMain">
      <div className="sectionleft">
        <p>New Trend</p>
        <h1>{HERO_PRODUCT.title}</h1>
        <span>{HERO_PRODUCT.subtitle}</span>
        <div className="heroLink">
          <Link to={HERO_PRODUCT.link} onClick={scrollToTop}>
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
          {/* Pass modelPath and color dynamically */}
          <Model color={productColor} modelPath={HERO_PRODUCT.modelPath} />
        </Canvas>
        <div className="heroColorBtn">
          {HERO_PRODUCT.colors.map((color) => (
            <button
              key={color}
              onClick={() => changeColor(color)}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

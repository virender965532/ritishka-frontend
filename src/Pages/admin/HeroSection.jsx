import React, { useState, useEffect } from 'react';
import HeroSectionList from './../../Components/Admin/HeroSectionList';
import "./../../Css/admincategory.css";

function HeroSection() {
  return (
    <div className="category-container">
      <HeroSectionList />
    </div>
  );
}

export default HeroSection;

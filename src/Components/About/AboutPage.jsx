import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>Where Elegance Meets Excellence</h2>
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>At Ritishka Silver, we believe that every piece of silver tells a story — of heritage,
             craftsmanship, and timeless beauty. Founded with a passion for purity and design, 
             our startup is dedicated to bringing you the finest silver jewelry and artifacts that
              blend traditional artistry with modern sophistication.
          </h4>
          <p>
          Whether you’re searching for everyday elegance or heirloom-worthy creations, Ritishka Silver 
          is your destination for authenticity, quality, and design innovation. Each item in our collection 
          is thoughtfully curated or handcrafted, using premium 92.5 sterling silver to ensure durability, 
          charm, and value.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Mission</h5>
              <p>
                Premium Sterling Silver (92.5%), Artisan Craftsmanship & Unique Designs, Customer-Centric Approach, 
                Ethically Sourced & Hand-Finished Products
              </p>
            </div>
            <div className="contentBox">
              <h5>Our Vision</h5>
              <p>
              join us on a journey where silver shines brighter — not just as a metal, but as a
               symbol of grace, culture, and individuality.
              </p>
              
            </div>
          </div>
          <div className="content2">
            {/* <div className="imgContent">
              <img src={about2} alt="" />
            </div> */}
            <div className="textContent">
              <h5>The Company</h5>
              <p>
              Ritishka Silver – Crafted with Passion, Delivered with Love.

              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Company Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;

import React from "react";
import Banner from "../Components/Home/Banner/Banner";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Services from "../Components/Home/Services/Services";
import Instagram from "../Components/Home/Instagram/Instagram";
import Trendy from "../Components/Home/Trendy/Trendy";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";
import TrendingProducts from "../Components/Home/Limited/TrendingProducts";
import HotSellerProducts from "../Components/Home/Limited/HotSellerProducts";
import FeaturedProducts from "../Components/Home/Limited/FeaturedProducts";
import DealTimer from "../Components/Home/Deal/DealTimer";
import HeroSection from "../Components/Home/Hero/HeroSection";
import Categories from "../Components/Home/Categories/Categories";
import DynamicCards from "../Components/Home/DynamicCards/DynamicCards";
import ThreeDynamicCards from "../Components/Home/ThreeDynamicCards/ThreeDynamicCards";
import PackingBoxCards from "../Components/Home/PackingBoxCards/PackingBoxCards";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <CollectionBox />
      <FeaturedProducts />
      {/* <Trendy /> */}
      {/* <Banner /> */}
      <HotSellerProducts />
      {/* <DealTimer /> */}
      <DynamicCards />
      <LimitedEdition />
      <ThreeDynamicCards />
      <Instagram />
      <TrendingProducts />
      <PackingBoxCards />
      <Services />
    </>
  );
};

export default Home;

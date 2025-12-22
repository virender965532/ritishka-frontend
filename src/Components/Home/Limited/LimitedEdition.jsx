import React, { useState, useEffect } from "react";
import "./LimitedEdition.css";

import useCart from "../../../customHooks/useCart";
import CartButton from "../../Common/CartButton";
import WishlistButton from "../../Common/WishlistButton/WishlistButton";
import { getImageUrl } from "../../../utils/imageUtils";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

// import StoreData from "../../../Data/StoreData";
// import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";

import toast from "react-hot-toast";
import { ProductTypes } from "./../../../api/api";
import { useSelector } from 'react-redux';

const LimitedEdition = () => {
  const { addToCart } = useCart();
  const [wishList, setWishList] = useState({});
  const [products, setProducts] = useState([]);

  const loadProducts = () => ProductTypes({types: ['isLatest']}).then((res) => {
        setProducts(res?.data)
      });
      
  useEffect(() => {
    loadProducts();
  }, []);
  

  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cartItems = useSelector((state) => state?.cart?.items);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Most <span>Latest</span> Products
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={2}
            slidesPerGroup={1}
            spaceBetween={30}
            loop={products.length > 4}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
            { products?.length > 0 &&  products.map((product) => {
              return (
                <SwiperSlide key={product?._id}>
                  <div className="lpContainer">
                    <div className="lpImageContainer">
                      <Link to={product?.slug ? `/product/` + product?.slug : '/shop'} onClick={scrollToTop}>
                        <img
                          src={getImageUrl(product?.images[0])}
                          alt={product?.title}
                          className="lpImage"
                        />
                      </Link>
                      <CartButton onClick={() => handleAddToCart(product)}>
                        <FaCartPlus style={{ marginRight: 6 }} /> Add to Cart
                      </CartButton>
                    </div>
                    <div className="lpProductImagesCart">
                      <CartButton onClick={() => handleAddToCart(product)}>
                        <FaCartPlus />
                      </CartButton>
                    </div>
                    <div className="limitedProductInfo">
                      <div className="lpCategoryWishlist">
                        <p>{product?.category?.name}</p>
                        <WishlistButton product={product} size={18} />
                      </div>
                      <div className="productNameInfo">
                        <Link to={product?.slug ? `/product/` + product?.slug : '/shop'} onClick={scrollToTop}>
                        <>
                          {product?.brand && (<h3>{product?.brand}</h3>)}
                          {product?.title && (<h5>{product?.title}</h5>)}
                        </>
                        </Link>
                        {product?.price && (
                          <>
                          <div className="jewel-product-price">
                              <span className="jewel-product-original">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.price || 0)}
                              </span>
                              <span className="jewel-product-discount">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.discountedPrice || 0)}
                              </span>
                            </div>
                          </>
                        )}
                        {/* <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>

                          <span>{product.productReviews}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;

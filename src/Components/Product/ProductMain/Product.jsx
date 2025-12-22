import React, { useState, useEffect } from "react";
import useCart from "../../../customHooks/useCart";
import useWishlist from "../../../customHooks/useWishlist";
import { getImageUrl } from "../../../utils/imageUtils";
import "./Product.css";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductBySlug } from "./../../../api/api";
import { useSelector } from "react-redux";
const ProductLightbox = React.lazy(() => import("./ProductLightbox"));

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const wishlistData = useSelector((state) => state?.wishlistData) || [];
  const cartData = useSelector((state) => state?.cartData) || [];
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState("");
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const [currentImg, setCurrentImg] = useState(0);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (!slug) {
      navigate("/");
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchProductBySlug();
  }, []);

  useEffect(() => {
    if(product?.colors?.length > 0 ){
      const defaultColor = product?.colors[0]
      setHighlightedColor(defaultColor);
    }
  }, [product]);

  useEffect(() => {
    setWishlistAdded(wishlistData.some(item => item.product_id === product._id));
  }, [wishlistData, product]);

  useEffect(() => {
    setCartAdded(cartData.some(item => item.product_id === product._id));
  }, [cartData, product]);

  const fetchProductBySlug = () => ProductBySlug(slug).then((res) => {
    if (!res?.data) {
      navigate("/");
    } else {
      setProduct(res?.data);
    }  
  });

  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? product?.images?.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === product?.images?.length - 1 ? 0 : currentImg + 1);
  };

  const handleWishClick = () => {
    toggleWishlist(product, highlightedColor);
  };

  const handleAddToCart = (quantity = 1) => {
    addToCart(product, highlightedColor, quantity);
  };

  // lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i) => { setLightboxIndex(i || 0); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const lightPrev = () => setLightboxIndex((p) => p === 0 ? (product?.images?.length - 1 || 0) : p - 1);
  const lightNext = () => setLightboxIndex((p) => p === (product?.images?.length - 1) ? 0 : p + 1);

  return (
    <div className="productContainer">
      <div className="productSection">
        <div className="productBreadcrumb">
          <div className="breadcrumbLink">
            <Link to="/">Home</Link>&nbsp;/&nbsp;
            <Link to="/shop">Shop</Link>&nbsp;/&nbsp;
            <p>{product?.title || ''}</p>
          </div>
        </div>
        <div className="productShowCase">
          <div className="productGalleryWrapper">
            <ProductGallery
              product={product}
              currentImg={currentImg}
              setCurrentImg={setCurrentImg}
              prevImg={prevImg}
              nextImg={nextImg}
              onOpenLightbox={openLightbox}
            />
          </div>
          <div className="productDetailsWrapper">
            <ProductInfo product={product} highlightedColor={highlightedColor} setHighlightedColor={setHighlightedColor} />
            <ProductActions wishlistAdded={wishlistAdded} cartAdded={cartAdded} handleWishClick={handleWishClick} handleAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>
      {lightboxOpen && (
        // lazy load ProductLightbox to avoid circular issues
        <React.Suspense fallback={null}>
          <ProductLightbox images={product?.images || []} startIndex={lightboxIndex} onClose={closeLightbox} onPrev={lightPrev} onNext={lightNext} />
        </React.Suspense>
      )}
    </div>
  );
};

export default Product;

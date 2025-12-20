import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import useCart from "../../../customHooks/useCart";
import useWishlist from "../../../customHooks/useWishlist";
import { getImageUrl } from "../../../utils/imageUtils";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Product.css";
import { useParams, useNavigate } from "react-router-dom";
import { ProductBySlug } from "./../../../api/api";

const Product = () => {
  // Product images Gallery
  const { slug } = useParams();
  const navigate = useNavigate();
  const [highlightedColor, setHighlightedColor] = useState("");
  const { addToCart } = useCart();
  const { toggleWishlist } = useWishlist();
  useEffect(() => {
    if (!slug) {
      navigate("/");
    }
  }, [slug, navigate]);
  const [currentImg, setCurrentImg] = useState(0);
  const [product, setProduct] = useState([]);

  const fetchProductBySlug = () => ProductBySlug(slug).then((res) => {
        if (!res?.data) {
          navigate("/");
        } else {
          setProduct(res?.data);
        }  
      });
      
  useEffect(() => {
    fetchProductBySlug();
  }, []);

  useEffect(() => {
    if(product?.colors?.length > 0 ){
      const defaultColor = product?.colors[0]
      setHighlightedColor(defaultColor);
    }
  }, [product]);

  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? product?.images?.length - 1 : currentImg - 1);
  };

  const nextImg = () => {
    setCurrentImg(currentImg === product?.images?.length - 1 ? 0 : currentImg + 1);
  };

  const handleWishClick = () => {
    toggleWishlist(product, highlightedColor);
  };

  const handleAddToCart = () => {
    addToCart(product, highlightedColor);
  };

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              <img src={product?.images ? getImageUrl(product?.images[0]) : `#`} onClick={() => setCurrentImg(0)} alt="" />
              <img src={product?.images ? getImageUrl(product?.images[1]) : `#`} onClick={() => setCurrentImg(1)} alt="" />
              <img src={product?.images ? getImageUrl(product?.images[2]) : `#`} onClick={() => setCurrentImg(2)} alt="" />
              <img src={product?.images ? getImageUrl(product?.images[3]) : `#`} onClick={() => setCurrentImg(3)} alt="" />
              <img src={product?.images ? getImageUrl(product?.images[4]) : `#`} onClick={() => setCurrentImg(4)} alt="" />
              <img src={product?.images ? getImageUrl(product?.images[5]) : `#`} onClick={() => setCurrentImg(5)} alt="" />
            </div>
            <div className="productFullImg">
              <img src={product?.images ? getImageUrl(product?.images[currentImg]) : `#`} alt="" />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/">Home</Link>&nbsp;/&nbsp;
                <Link to="/shop">Shop</Link>&nbsp;/&nbsp;
                <p>{product?.title || ''}</p>
              </div>
            </div>
            <div className="productName">
              <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>{product?.brand || ''}</h1>
              <h2>{product?.title || ''}</h2>
            </div>
            {/* <div className="productRating">
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <FaStar color="#FEC78A" size={10} />
              <p>8k+ reviews</p>
            </div> */}
            <div className="productPrice">
              <h3>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.price)}</h3>
            </div>
            <div className="productDescription">
              <p>{product?.shortDescription  || ''}</p>
            </div>
            <div className="productDescription">
              <p>{product?.description  || ''}</p>
            </div>
            <div className="productSizeColor">
              <div className="productColor">
                <p>Color</p>
                <div className="colorBtn">
                  {product?.colors?.map((color) => (
                    <Tooltip
                      key={color}
                      placement="top"
                      enterTouchDelay={0}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <button
                        className={
                          highlightedColor === color ? "highlighted" : ""
                        }
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border:
                            highlightedColor === color
                              ? "0px solid #000"
                              : "0px solid white",
                          padding: "8px",
                          margin: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setHighlightedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  <FiHeart color={""} size={17} />
                  <p>Add to Wishlist</p>
                </button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
              {/* <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p>Share</p>
              </div> */}
            </div>
            <div className="productTags">
              <p>
                <span>CATEGORIES: </span>{product?.category?.name || 'N/A'}
              </p>
              <p>
                <span>SUB-CATEGORIES: </span>{product?.subcategory?.name || 'N/A'}
              </p>
              <p>
                <span>TAGS: </span>{product?.tags?.length > 0 ? product?.tags.map((el, index)=> {
                  return el?.name
                }).join(',') : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { fetchTags, ProductTag } from "./../../../api/api";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab0");
  const [wishList, setWishList] = useState({});
  const [tags, setTags] = useState([]);
  const [productTagData, setProductTagData] = useState([]);
  const [tagurl, setTagUrl] = useState("/shop?tag=[]");
    const loadData = () => fetchTags().then((res) => { 
      const tagsList = res.data.filter((tag) => tag.showonhomepage && tag.isactive)
      setTags(tagsList)}
    );
    const loadProductTag = () => ProductTag({tagIds:tags?.filter((el,index)=>index<=3)?.map(el => el._id)}).then((res) => {
      setProductTagData(res?.data)
    });
    
    useEffect(() => {
      loadData();
    }, []);

    useEffect(() => {
      if(tags?.length > 0)
      loadProductTag();
      setTagUrl(`/shop?tag=[${tags?.[0]?._id?.toString()}]`);
    }, [tags])
  const handleTabClick = (tab) => {
    setTagUrl(`/shop?tag=[${tags?.[parseInt(tab.replace("tab", ""))]?._id?.toString()}]`);
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const sortByPrice = (a, b) => a.productPrice - b.productPrice;

  const sortByReviews = (a, b) => {
    const reviewsA = parseInt(
      a.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    const reviewsB = parseInt(
      b.productReviews.replace("k+ reviews", "").replace(",", "")
    );
    return reviewsB - reviewsA;
  };

  const cartItems = useSelector((state) => state?.cart?.items);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find(
      (item) => item.productID === product.productID
    );

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    } else {
      dispatch(addToCart(product));
      toast.success(`Added to cart!`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    }
  };

  return (
    <>
      <div className="trendyProducts">
        <h2>
          New Arrivals Products 
        </h2>
        { tags?.length > 0  &&  (
          <>
            <div className="trendyTabs">
              <div className="tabs">
                {
                  tags.map((tag, index) => (
                    <p
                      onClick={() => handleTabClick(`tab${index}`)}
                      className={activeTab === `tab${index}` ? "active" : ""}
                    >
                      {tag?.name}
                    </p>
                  ))
                }
              </div>

              <div className="trendyTabContent">
                {
                  tags.map((tag, index) => (
                    <>
                    {activeTab === `tab${index}` && (
                      <>
                        <div className="trendyMainContainer">
                          {productTagData?.length > 0 && productTagData?.filter((el) => el.tags?.includes(tag?._id)).map((product) => (
                            <div className="trendyProductContainer" key={product._id}>
                              <div className="trendyProductImages">
                                <Link to={product?.slug ? `/product/` + product?.slug : '/shop'} onClick={scrollToTop}>
                                  <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}` + product?.images[0]}
                                    alt=""
                                    className="trendyProduct_front"
                                  />
                                  <img
                                    src={`${process.env.REACT_APP_BACKEND_URL}` + product?.images[1]}
                                    alt=""
                                    className="trendyProduct_back"
                                  />
                                </Link>
                                <h4 onClick={() => handleAddToCart(product)}>
                                  Add to Cart
                                </h4>
                              </div>
                              <div
                                className="trendyProductImagesCart"
                                onClick={() => handleAddToCart(product)}
                              >
                                <FaCartPlus />
                              </div>
                              <div className="trendyProductInfo">
                                <div className="trendyProductCategoryWishlist">
                                  <p>{product?.category?.name || ''}</p>
                                  <FiHeart
                                    onClick={() => handleWishlistClick(product._id)}
                                    style={{
                                      color: wishList[product._id]
                                        ? "red"
                                        : "#767676",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                                <div className="trendyProductNameInfo">
                                  <Link to={product?.slug ? `/product/` + product?.slug : '/shop'} onClick={scrollToTop}>
                                    <h5>{product?.title || ''}</h5>
                                  </Link>

                                  <p>${product?.price}</p>
                                  <div className="trendyProductRatingReviews">
                                    <div className="trendyProductRatingStar">
                                    </div>
                                  </div>
                                </div>  
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    </>
                  ))
                }
              </div>
            </div>
          </>
        )}
        <div className="discoverMore">
          <Link to={tagurl} onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;

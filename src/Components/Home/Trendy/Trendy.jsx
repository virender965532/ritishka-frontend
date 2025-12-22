import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../../utils/imageUtils";
import { Link } from "react-router-dom";
import WishlistButton from "../../Common/WishlistButton/WishlistButton";
import { FaCartPlus } from "react-icons/fa";
import { fetchTags, ProductTag } from "./../../../api/api";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab0");
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
  const cartItems = useSelector((state) => state?.cart?.items);


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
                          {productTagData?.length > 0 && productTagData?.filter((el) => el.tags?.some((tagId) => tagId?._id === tag?._id)).map((product) => (
                            <div className="trendyProductContainer" key={product._id}>
                              <div className="trendyProductImages">
                                <Link to={product?.slug ? `/product/` + product?.slug : '/shop'} onClick={scrollToTop}>
                                  <img
                                    src={getImageUrl(product?.images[0])}
                                    alt=""
                                    className="trendyProduct_front"
                                  />
                                  <img
                                    src={getImageUrl(product?.images[1])}
                                    alt=""
                                    className="trendyProduct_back"
                                  />
                                </Link>
                                <h4 >
                                  Add to Cart
                                </h4>
                              </div>
                              <div
                                className="trendyProductImagesCart"
                              >
                                <FaCartPlus />
                              </div>
                              <div className="trendyProductInfo">
                                <div className="trendyProductCategoryWishlist">
                                  <p>{product?.category?.name || ''}</p>
                                  <WishlistButton product={product} size={18} />
                                </div>
                                <div className="trendyProductNameInfo">
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

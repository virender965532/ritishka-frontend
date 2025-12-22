import React from "react";
import { getImageUrl } from "../../../utils/imageUtils";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const ProductGallery = ({ product, currentImg, setCurrentImg, prevImg, nextImg, onOpenLightbox }) => {
  const images = product?.images || [];
  return (
    <div className="productGallery">
      <div className="productThumb">
        {Array.from({ length: Math.max(6, images.length) }).map((_, i) => (
          <img
            key={i}
            src={images[i] ? getImageUrl(images[i]) : "#"}
            onClick={() => setCurrentImg(i)}
            alt="thumb"
          />
        ))}
      </div>
      <div className="productFullImg">
        <img src={images[currentImg] ? getImageUrl(images[currentImg]) : "#"} alt="full" onClick={() => onOpenLightbox && onOpenLightbox(currentImg)} />
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
  );
};

export default ProductGallery;

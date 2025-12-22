import React, { useEffect, useRef } from "react";
import { getImageUrl } from "../../../utils/imageUtils";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const ProductLightbox = ({ images = [], startIndex = 0, onClose, onPrev, onNext }) => {
  const idx = Math.max(0, Math.min(startIndex, images.length - 1));
  const touchStart = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStart.current;
    if (diff > 40) onPrev();
    else if (diff < -40) onNext();
    touchStart.current = null;
  };

  return (
    <div className="jewel-lightbox" onClick={onClose}>
      <div className="jewel-lightbox-content" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <button className="jewel-lightbox-nav left" onClick={onPrev}><GoChevronLeft size={26} /></button>
        <img src={images[idx] ? getImageUrl(images[idx]) : "#"} alt="enlarge" />
        <button className="jewel-lightbox-nav right" onClick={onNext}><GoChevronRight size={26} /></button>
        <button className="jewel-lightbox-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ProductLightbox;

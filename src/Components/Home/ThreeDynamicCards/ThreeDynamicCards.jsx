import React, { useEffect, useState } from "react";
import "./ThreeDynamicCards.css";
import { fetchThreeDynamicCards } from "../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";

const ThreeDynamicCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchThreeDynamicCards().then((res) => {
      if (Array.isArray(res.data)) {
        setCards(res.data.filter((card) => card.isactive));
      }
    });
  }, []);

  return (
    <section className="three-dynamic-cards-section">
      <div className="three-dynamic-cards-container">
        {cards.map((card, idx) => (
          <a
            href={card.link}
            className="three-dynamic-card"
            key={idx}
            target="_self"
            rel="noopener noreferrer"
          >
            <div className="three-dynamic-card-img-wrapper">
              <img
                src={getImageUrl(card.img)}
                alt={card.alt}
                loading="lazy"
              />
            </div>
            <div className="three-dynamic-card-overlay">
              <span className="three-dynamic-card-label">View All</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ThreeDynamicCards;

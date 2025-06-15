import React, { useEffect, useState } from "react";
import "./PackingBoxCards.css";
import { fetchPackingBoxSections } from "../../../api/api";

const PackingBoxCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchPackingBoxSections().then((res) => {
      if (Array.isArray(res.data)) {
        setCards(res.data.filter((card) => card.isactive));
      }
    });
  }, []);

  return (
    <section className="packing-box-cards-section">
      <div className="packing-box-cards-header">
        <h2>Shop by Price</h2>
        <p>For every occasion &amp; gifting needs</p>
      </div>
      <div className="packing-box-cards-container">
        {cards.map((card, idx) => (
          <a
            href={card.link}
            className="packing-box-card"
            key={idx}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="packing-box-card-img-wrapper">
              <img src={`${process.env.REACT_APP_BACKEND_URL}${card.img}`} alt={card.alt} loading="lazy" />
            </div>
            <div className="packing-box-card-content">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PackingBoxCards;

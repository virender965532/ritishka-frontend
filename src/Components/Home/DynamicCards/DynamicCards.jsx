import React, { useState, useEffect } from "react";
import "./dynamiccards.css";
import { fetchDynamicCards } from "../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";

const DynamicCards = () => {
  const [cards, setCards] = useState([]);
  const [mainCard, setMainCard] = useState({});
  
    useEffect(() => {
      fetchDynamicCards().then((res) => {
        if (Array.isArray(res.data)) {
          // Filter active cards and set the main card
          const activeCards = res.data.filter((card) => card.isactive);
          setCards(activeCards.filter(card => card.type !== 'main'));
          // Set the first active card as the main card
          setMainCard(activeCards.filter(card => card.type === 'main')[0]);
        }
      });
    }, []);

  return (
    <section className="dynamic-cards-section">
      <h2 className="dynamic-cards-title">Fresh on Ritishka</h2>
      <div className="dynamic-cards-grid-mobile">
        <div className="main-card-mobile">
          <a href={mainCard?.link ? mainCard?.link : '#'}>
            <img src={getImageUrl(mainCard?.img)} alt={mainCard?.alt} className="main-img-mobile" loading="lazy" />
          </a>
        </div>
        <div className="side-cards-mobile">
          {cards.map((card, idx) => (
            <a href={card?.link ? card?.link : '#'} key={idx} className="side-card-mobile">
              <img src={getImageUrl(card?.img)} alt={card?.alt} className="side-img-mobile" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
      <div className="dynamic-cards-grid-desktop">
        <div className="main-card-desktop">
          <a className="main-img-desktop" href={mainCard?.link ? mainCard?.link : '#'}>
            <img src={getImageUrl(mainCard?.img)} alt={mainCard?.alt} className="main-img-desktop" loading="lazy" />
          </a>
        </div>
        <div className="side-cards-desktop">
          {cards.map((card, idx) => (
            <a href={card?.link ? card?.link : '#'} key={idx} className="side-card-desktop">
              <img src={getImageUrl(card?.img)} alt={card?.alt} className="side-img-desktop" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicCards;

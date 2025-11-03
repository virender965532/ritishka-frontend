import React from "react";
import "./SilverCare.css"

const SilverCare = () => {
  return (
    <>
    <div className="care-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Jewellery Care Guide</h1>
        <p>
          Keep your sterling silver & plated jewellery sparkling for years with
          these simple care tips.
        </p>
      </section>

      {/* What is Sterling Silver */}
      <section className="section">
        <h2>What is Sterling Silver?</h2>
        <p>
          Sterling silver is made from 92.5% pure silver mixed with other metals
          for durability. Pure silver is too soft, so sterling silver is used
          for lasting jewellery.
        </p>
      </section>

      {/* Care Instructions */}
      <section className="section">
        <h2>How to Care for Your Silver Jewellery</h2>
        <ul>
          <li>Polish regularly with a soft cloth (avoid silver dip).</li>
          <li>Store in a pouch, keep pieces separate to avoid scratches.</li>
          <li>Clean gemstones with warm water & mild soap.</li>
          <li>Avoid exposure to chemicals like perfume, bleach, hairspray.</li>
          <li>Remove jewellery before showering, swimming, or applying lotion.</li>
        </ul>
      </section>

      {/* Tarnish Section */}
      <section className="section">
        <h2>Why Does Silver Tarnish?</h2>
        <p>
          Tarnishing happens when the copper in sterling silver oxidises due to
          air, humidity, or chemicals. Black/green marks on skin may come from
          reactions with sweat or cosmetics.
        </p>
        <h3>Prevention Tips:</h3>
        <ul>
          <li>Polish jewellery often</li>
          <li>Clean skin before wearing</li>
          <li>Remove jewellery while applying makeup</li>
        </ul>
      </section>

      {/* Plated Jewellery */}
      <section className="section">
        <h2>Caring for Plated Jewellery</h2>
        <p>
          Plating fades over time with frequent wear. This is normal wear & tear.
          To prolong plating:
        </p>
        <ul>
          <li>Avoid water, sweat & chemicals</li>
          <li>Store separately in soft pouches</li>
          <li>Dry thoroughly after exposure to moisture</li>
        </ul>
      </section>

      {/* Reminders */}
      <section className="reminders">
        <h2>Important Reminders</h2>
        <p>
          Regular cleaning & careful storage will keep your jewellery sparkling
          and beautiful for years.
        </p>
        <div className="cards">
          <div className="card">
            <h3>Avoid Chemicals</h3>
            <p>Keep away from chlorine, nail polish remover, lotions & sprays.</p>
          </div>
          <div className="card">
            <h3>Store Safely</h3>
            <p>Use soft pouches or boxes to prevent scratches & tarnish.</p>
          </div>
          <div className="card">
            <h3>Clean Often</h3>
            <p>Gentle polishing keeps your silver bright & shiny.</p>
          </div>
        </div>
      </section>
    </div>
    </>
     );
};

export default SilverCare;

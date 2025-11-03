import React, { useMemo, useState } from "react";
import "./AboutPage.css";
import { fetchCategories } from "../../api/api";


function AboutPage() {
  const [categories, setCategories] = useState([]);
  useMemo(() => {
      const fetchData = async () => {
        try {
          const res = await fetchCategories({ page: 1, limit: 10, search: "" });
          let cats = res.data.categories || [];
          cats = cats.filter((cat) => cat.isactive);
          cats.sort((a, b) => a.name.localeCompare(b.name));
          setCategories(cats);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchData();
    }, []); 
  return (
    <>
      <section
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "60px 20px",
          background: "#fafafa",
          color: "#222",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Heading */}
          <h1
            style={{
              textAlign: "center",
              fontSize: "32px",
              lineHeight: "1.3",
              marginBottom: "20px",
              color: "#c39e8a",
            }}
          >
            About Us
          </h1>
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto 50px",
            }}
          >
            Welcome to <strong>Ritishka</strong>, where timeless elegance meets
            modern charm in every piece of{" "}
            <strong>925 Sterling Silver Jewellery</strong>.
          </p>

          {/* Mission & Vision */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
              marginBottom: "50px",
            }}
          >
            <div className="about-text mission">
              <h2 style={{ color: "#c39e8a", marginTop: 0 }}>Our Mission</h2>
              <p>
                At Ritishka, our mission is to make{" "}
                <strong>925 Sterling Silver Jewellery</strong> a part of everyone's everyday
                elegance. We aim  to deliver high-quality, affordable luxury piecesthat blend timeless beauty
                with modern design.
              </p>
            </div>

            <div className="about-text vision">
              <h2 style={{ color: "#c39e8a", marginTop: 0 }}>Our Vision</h2>
              <p>
                Our vision is to be a trusted jewellery brand that stands for
                purity, authenticity, and elegance, making silver jewellery not just an
                accessory but an expression of style and emotion.
              </p>
            </div>
          </div>

          {/* Who Are We */}
          <div className="about-text who-are-we">
            <h2 style={{ color: "#c39e8a", marginTop: 0 }}>Who Are We?</h2>
            <p>
              We are <strong>Ritishka</strong>, an e-commerce jewellery brand
              dedicated to creating fine <strong>Sterling Silver Jewellery</strong>. Every piece we
              design reflects passion, craftsmanship, and attention to detail. From minimal
              daily wear to statement pieces our jewellery is made to complement every occasions.
            </p>
          </div>

          {/* Why Ritishka */}
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ textAlign: "center", color: "#c39e8a" }}>
              Why Choose Ritishka?
            </h2>
            <div className="about-text why-ritishka">
              {[
                {
                  title: "Authenticity",
                  desc: "Genuine 925 Sterling Silver, hallmarked for purity.",
                },
                {
                  title: "Rhodium Plated",
                  desc: "Extra shine, durability and long-lasting beauty.",
                },
                {
                  title: "Premium Packaging",
                  desc: "Elegant packaging for a luxurious unboxing experience.",
                },
                {
                  title: "Perfect for Gifting",
                  desc: "Thoughtfully crafted jewellery that makes the ideal gift.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="why-ritishka-item about-text"
                >
                  <h3 style={{ marginTop: 0, color: "#333" }}>✔ {item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Products */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ color: "#c39e8a", marginTop: 0, textAlign: "center" }}>
              Our Products
            </h2>
            <p style={{ textAlign: "center", color: "#555" }}>
              We offer a wide collection of fine 925 Sterling Silver Jewellery:
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              {categories.map((Category, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "#f6f6f6",
                    padding: "10px 18px",
                    borderRadius: "25px",
                  }}
                >
                  {Category?.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default AboutPage;

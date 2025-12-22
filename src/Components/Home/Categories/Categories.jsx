import React, { useEffect, useMemo, useState } from "react";
import { fetchCategories } from "../../../api/api";
import { getImageUrl } from "../../../utils/imageUtils";
import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
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
    <section className="categories-section">
      <h2>
        <span className="categories-header">Explore Our Categories</span> 
      </h2>
      <div className="categories-desktop">
        <ul className="categories-list">
          {categories.map((cat) => (
            <li className="categories-item" key={`desktop-${cat._id}`}>
              <Link to={`/shop?category=${cat.name || cat.name.toLowerCase()}`}
                aria-label="homepage" className="categories-link">
                <img
                  alt={cat.name}
                  className="categories-img"
                  src={getImageUrl(cat?.image)}
                  loading="lazy"
                />
                <div className="categories-title">{cat.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="categories-mobile">
        <div className="categories-scroll">
          <ul className="categories-list-mobile">
            {categories.map((cat) => (
              <li className="categories-item-mobile" key={`mobile-${cat._id}`}>
                <Link to={`/shop?category=${cat.name || cat.name.toLowerCase()}`}
                  aria-label="homepage" className="categories-link-mobile">
                  <img
                    alt={cat.name}
                    className="categories-img-mobile"
                    src={getImageUrl(cat?.image)}
                    loading="lazy"
                  />
                  <div className="categories-title-mobile">{cat.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Categories;

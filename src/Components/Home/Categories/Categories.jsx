import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../api/api";
import "./categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        let cats = res.data || [];
        cats = cats.filter((cat) => cat.isactive);
        cats.sort((a, b) => a.name.localeCompare(b.name));
        setCategories(cats);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <section className="categories-section">
      <h2>
        <span className="categories-title">Explore Our Categories</span> 
      </h2>
      <div className="categories-desktop">
        <ul className="categories-list">
          {categories.map((cat) => (
            <li className="category-item" key={cat._id}>
              <Link to={`/categories/${cat.slug || cat.name.toLowerCase()}`}
                aria-label="homepage" className="category-link">
                <img
                  alt={cat.name}
                  className="category-img"
                  src={`${process.env.REACT_APP_BACKEND_URL}` + cat?.image}
                  loading="lazy"
                />
                <div className="category-title">{cat.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="categories-mobile">
        <div className="categories-scroll">
          <ul className="categories-list-mobile">
            {categories.map((cat) => (
              <li className="category-item-mobile" key={cat._id}>
                <Link to={`/categories/${cat.slug || cat.name.toLowerCase()}`}
                  aria-label="homepage" className="category-link-mobile">
                  <img
                    alt={cat.name}
                    className="category-img-mobile"
                    src={`${process.env.REACT_APP_BACKEND_URL}` + cat?.image}
                    loading="lazy"
                  />
                  <div className="category-title-mobile">{cat.name}</div>
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

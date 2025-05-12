import React, { useState, useEffect } from "react";
import "./CollectionBox.css";
import { fetchCollections } from "./../../../api/api";

import { Link } from "react-router-dom";

const CollectionBox = () => {
  const [collections, setCollections] = useState([]);
  const loadData = () => fetchCollections().then((res) => { 
    const collectionList = res.data.filter((collection) => collection.showonhomepage && collection.isactive)
    setCollections(collectionList)});

  useEffect(() => {
      loadData();
    }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
    {collections?.length > 0  && (
      <div className="collection">
        <div className="collectionLeft">
          <p className="col-p">Hot List</p>
          <h3 className="col-h3">
            <span>{collections[0].name || "Women"}</span> {collections[0].subtitle || "Collection"}
          </h3>
          <p className="col-p">
            {collections[0].description || ""}
          </p>
          <div className="col-link">
            <Link to={collections[0].link} onClick={scrollToTop}>
              <h5>Shop Now</h5>
            </Link>
          </div>
        </div>
        <div className="collectionRight">
          <div className="collectionTop">
            <p className="col-p">Hot List</p>
            <h3 className="col-h3">
            <span>{collections[1].name || "Men"}</span> {collections[1].subtitle || "Collection"}
            </h3>
            <p className="col-p">
              {collections[1].description || ""}
            </p>
            <div className="col-link">
              <Link to={collections[1].link} onClick={scrollToTop}>
                <h5>Shop Now</h5>
              </Link>
            </div>
          </div>
          <div className="collectionBottom">
            <div className="box1">
              <p className="col-p">Hot List</p>
              <h3 className="col-h3">
              <span>{collections[2].name || "Kids"}</span> {collections[2].subtitle || "Collection"}
              </h3>
              <p className="col-p">
                {collections[2].description || ""}
              </p>
              <div className="col-link">
                <Link to={collections[2].link} onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
            <div className="box2">
              <h3 className="col-h3">
              <span>{collections[3].name || "E-Gift"}</span> {collections[3].subtitle || "Cards"}
              </h3>
              <p className="col-p">
                {collections[3].description || ""}
              </p>
              <div className="col-link">
                <Link to={collections[3].link} onClick={scrollToTop}>
                  <h5>Shop Now</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default CollectionBox;

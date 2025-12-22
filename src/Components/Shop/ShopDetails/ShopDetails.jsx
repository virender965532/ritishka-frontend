import React, { useState, useEffect } from "react";
import "./ShopDetails.css";
import useCart from "../../../customHooks/useCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WishlistButton from "../../Common/WishlistButton/WishlistButton";
import { FaCartPlus } from "react-icons/fa";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";
import { getImageUrl } from "../../../utils/imageUtils";
import {
  filterProducts,
  fetchCategories,
  fetchCollections,
  fetchOccasions,
  fetchTags,
} from "./../../../api/api";
import { useSelector, useDispatch } from 'react-redux';

const GOLD = "#ffebc6";
const SORT_OPTIONS = [
  { value: "", label: "Recommendations" },
  { value: "latest", label: "Latest" },
  { value: "featured", label: "Featured" },
  { value: "bestSeller", label: "Best Seller" },
  { value: "lowToHigh", label: "Price Low to High" },
  { value: "highToLow", label: "Price High to Low" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getIdsFromNames = (names, all) => {
  if (!names) return [];
  const arr = names.split(",").map((n) => n.trim()).filter(Boolean);
  return all.filter((item) => arr.includes(item.name)).map((item) => item._id);
};
const getNamesFromIds = (ids, all) => {
  return all.filter((item) => ids.includes(item._id)).map((item) => item.name);
};

const ShopDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const { addToCart } = useCart();

  // Filter options
  const [allCategories, setAllCategories] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [allOccasions, setAllOccasions] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Product and filter state
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(query.get("sort") || "");
  const [page, setPage] = useState(Number(query.get("page")) || 1);
  const [filters, setFilters] = useState({
    priceMin: query.get("priceMin") ? Number(query.get("priceMin")) : 0,
    priceMax: query.get("priceMax") ? Number(query.get("priceMax")) : 50000,
    category: [],
    collection: [],
    occasion: [],
    tag: [],
    color: [],
  });
  const [priceRange, setPriceRange] = useState([
    filters.priceMin,
    filters.priceMax,
  ]);
  const wishlistData = useSelector((state) => state?.wishlistData) || [];
  const cartData = useSelector((state) => state?.cartData) || [];

  // For one-time filter initialization from URL
  const [filtersInitialized, setFiltersInitialized] = useState(false);

  // Fetch filter options
  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchCollections(),
      fetchOccasions(),
      fetchTags(),
    ]).then(([cat, col, occ, tag]) => {
      setAllCategories(cat.data?.categories || []);
      setAllCollections(col.data || []);
      setAllOccasions(occ.data || []);
      setAllTags(tag.data || []);
    }).catch((err) => {
      console.error("Error fetching filter options:", err);
    });
  }, []);

  // Parse filters from URL (names, not IDs) when filter options are loaded
  useEffect(() => {
    if (
      !filtersInitialized &&
      allCategories.length &&
      allCollections.length &&
      allOccasions.length &&
      allTags.length
    ) {
      setFilters((prev) => ({
        ...prev,
        category: getIdsFromNames(query.get("category") || "", allCategories),
        collection: getIdsFromNames(query.get("collection") || "", allCollections),
        occasion: getIdsFromNames(query.get("occasion") || "", allOccasions),
        tag: getIdsFromNames(query.get("tag") || "", allTags),
      }));
      setFiltersInitialized(true);
    }
    // eslint-disable-next-line
  }, [
    allCategories,
    allCollections,
    allOccasions,
    allTags,
    filtersInitialized,
  ]);

  // Update URL with names (not IDs) when filters/sort/page change
  useEffect(() => {
    if (!filtersInitialized) return;
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (page) params.set("page", page);
    if (filters.priceMin !== 0) params.set("priceMin", filters.priceMin);
    if (filters.priceMax !== 100000) params.set("priceMax", filters.priceMax);

    // Use names in URL, comma separated
    if (filters.category.length)
      params.set(
        "category",
        getNamesFromIds(filters.category, allCategories).join(",")
      );
    if (filters.collection.length)
      params.set(
        "collection",
        getNamesFromIds(filters.collection, allCollections).join(",")
      );
    if (filters.occasion.length)
      params.set(
        "occasion",
        getNamesFromIds(filters.occasion, allOccasions).join(",")
      );
    if (filters.tag.length)
      params.set(
        "tag",
        getNamesFromIds(filters.tag, allTags).join(",")
      );
    navigate({ search: params.toString() }, { replace: true });
    // eslint-disable-next-line
  }, [filters, sort, page, allCategories, allCollections, allOccasions, allTags, filtersInitialized]);

  // When sending to API, always use IDs from state
  useEffect(() => {
    if (!filtersInitialized) return;
    filterProducts({
      sort,
      page,
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      category: filters.category,
      collection: filters.collection,
      occasion: filters.occasion,
      tag: filters.tag,
      color: filters.color,
    }).then((res) => {
      setProducts(res?.data?.products || []);
      setCurrentPage(res?.data?.currentPage || 1);
      setTotalPages(res?.data?.totalPages || 1);
    }).catch((err) => {
      console.error("Error fetching filtered products:", err);
    });
  }, [filters, sort, page, filtersInitialized]);

  // Handlers
  const handleMultiSelect = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setFilters((prev) => ({
      ...prev,
      priceMin: range[0],
      priceMax: range[1],
    }));
  };

  const handleSortChange = (e) => setSort(e.target.value);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const clearFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 100000,
      category: [],
      collection: [],
      occasion: [],
      tag: [],
      color: [],
    });
    setPriceRange([0, 100000]);
  };

  // Show selected filter names
  const getNames = (ids, all) =>
    all.filter((item) => ids.includes(item._id)).map((item) => item.name);

  // Pagination rendering
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`jewel-pagination-num${i === currentPage ? " active" : ""}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="jewel-shop-pagination">
        <button
          className="jewel-pagination-btn"
          onClick={() => setPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <div className="jewel-pagination-numbers">{pages}</div>
        <button
          className="jewel-pagination-btn"
          onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // UI
  return (
    <div className="jewel-shop-bg">
      <div className="jewel-shop-header">
        <h1>
          <span style={{ color: GOLD }}>Our Jewellery Collection</span>
        </h1>
        <p>
          Discover timeless elegance and exquisite craftsmanship. Find the perfect piece for every occasion.
        </p>
      </div>
      <div className="jewel-shop-toolbar">
        <div />
        <div className="jewel-shop-sort">
          <label htmlFor="sort" style={{ color: GOLD, fontWeight: 600 }}>
            Sort by:
          </label>
          <select
            name="sort"
            id="sort"
            value={sort}
            onChange={handleSortChange}
            style={{
              border: `2px solid ${GOLD}`,
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 600,
              color: "#7c6f57",
              background: "#fffdf7",
              marginLeft: 8,
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="jewel-shop-main">
        <aside className="jewel-shop-sidebar">
          <div className="jewel-filters">
            <div className="jewel-filter-group">
              <label className="jewel-filter-label">Price</label>
              <div className="jewel-price-slider-bar">
                <RcSlider
                  range
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange}
                  onChange={handlePriceChange}
                  allowCross={false}
                  trackStyle={[{ backgroundColor: GOLD }]}
                  handleStyle={[
                    { borderColor: GOLD, backgroundColor: "#fff" },
                    { borderColor: GOLD, backgroundColor: "#fff" },
                  ]}
                  railStyle={{ backgroundColor: "#f7e4c0" }}
                />
                <div className="jewel-price-minmax">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="jewel-filter-group">
              <label className="jewel-filter-label">Category</label>
              <div className="jewel-multiselect">
                {allCategories.map((cat) => (
                  <label key={cat._id} className="jewel-multiselect-label">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(cat._id)}
                      onChange={() => handleMultiSelect("category", cat._id)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="jewel-filter-group">
              <label className="jewel-filter-label">Collection</label>
              <div className="jewel-multiselect">
                {allCollections.map((col) => (
                  <label key={col._id} className="jewel-multiselect-label">
                    <input
                      type="checkbox"
                      checked={filters.collection.includes(col._id)}
                      onChange={() => handleMultiSelect("collection", col._id)}
                    />
                    {col.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="jewel-filter-group">
              <label className="jewel-filter-label">Occasion</label>
              <div className="jewel-multiselect">
                {allOccasions.map((occ) => (
                  <label key={occ._id} className="jewel-multiselect-label">
                    <input
                      type="checkbox"
                      checked={filters.occasion.includes(occ._id)}
                      onChange={() => handleMultiSelect("occasion", occ._id)}
                    />
                    {occ.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="jewel-filter-group">
              <label className="jewel-filter-label">Tag</label>
              <div className="jewel-multiselect">
                {allTags.map((tag) => (
                  <label key={tag._id} className="jewel-multiselect-label">
                    <input
                      type="checkbox"
                      checked={filters.tag.includes(tag._id)}
                      onChange={() => handleMultiSelect("tag", tag._id)}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>
            <button
              className="jewel-filter-clear"
              onClick={clearFilters}
              type="button"
            >
              Clear Filters
            </button>
          </div>
          {/* Show selected filter names */}
          <div className="jewel-selected-filters">
            {getNames(filters.category, allCategories).map((name) => (
              <span key={name}>Category: {name}</span>
            ))}
            {getNames(filters.collection, allCollections).map((name) => (
              <span key={name}>Collection: {name}</span>
            ))}
            {getNames(filters.occasion, allOccasions).map((name) => (
              <span key={name}>Occasion: {name}</span>
            ))}
            {getNames(filters.tag, allTags).map((name) => (
              <span key={name}>Tag: {name}</span>
            ))}
          </div>
        </aside>
        <section className="jewel-shop-products">
          <div className="jewel-products-grid jewel-products-4col">
            {products?.length > 0 ? (
              products.map((product) => {
                const discounted = Math.round(product.price * 0.9);
                return (
                  <div className="jewel-product-card" key={product._id}>
                    <div className="jewel-product-img-wrap">
                      <Link
                        to={product?.slug ? `/product/` + product?.slug : "/shop"}
                      >
                        <img
                          src={getImageUrl(product?.images[0])}
                          alt={product?.title}
                          className="jewel-product-img"
                        />
                        {product?.images[1] && (
                          <img
                            src={getImageUrl(product?.images[1])}
                            alt={product?.title}
                            className="jewel-product-img-back"
                          />
                        )}
                      </Link>
                      <WishlistButton
                        product={product}
                        size={22}
                        className="jewel-wishlist"
                        style={{ borderColor: `${wishlistData.some(item => item.product_id === product._id) ? "#e74c3c" : "#ffebc6"}` }}
                      />
                    </div>
                    <div className="jewel-product-info">
                      <div className="jewel-product-category">
                        {product?.brand || ""}
                      </div>
                      <Link
                        to={product?.slug ? `/product/` + product?.slug : "/shop"}
                        className="jewel-product-title"
                        title={product?.title}
                      >
                        {product?.title}
                      </Link>
                      <div className="jewel-product-price">
                        <span className="jewel-product-original">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(product?.price)}
                        </span>
                        <span className="jewel-product-discount">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR'}).format(discounted)}
                        </span>
                      </div>
                      <button
                        className="jewel-add-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus style={{ marginRight: 6 }} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="noProductsFound">
                <h3>No Products Found</h3>
              </div>
            )}
          </div>
          {/* Pagination */}
          {renderPagination()}
        </section>
      </div>
    </div>
  );
};

export default ShopDetails;
